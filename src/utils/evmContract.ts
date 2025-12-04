import { ethers } from 'ethers';
import { getWalletClient } from 'wagmi/actions';
import { wagmiConfig } from '../config/wagmi';
import config from '../config';
import Ninj4Artifact from '../abi/NINJ4NFT.json';

const NFT_ABI = Ninj4Artifact;
const MAX_PER_WALLET = 1;

// EVM 合约交互服务类
export class EvmContractService {
  private provider: ethers.BrowserProvider | null = null;
  private contract: ethers.Contract | null = null;
  private signer: ethers.JsonRpcSigner | null = null;
  private isInitialized = false;
  private currentAccount: string | null = null;
  private readProvider: ethers.JsonRpcProvider | null = null;
  private readContract: ethers.Contract | null = null;

  private async getReadContract(): Promise<ethers.Contract> {
    this.ensureReadProvider();
    if (!this.readContract) {
      throw new Error("只读合约未初始化");
    }
    return this.readContract;
  }

  constructor() {
    // 延迟初始化，等待 window.ethereum 可用
  }

  private getRpcConfig() {
    if (config.networkType === "testnet") {
      return config.chain.testnet;
    }
    if (config.networkType === "mainnet") {
      return config.chain.mainnet;
    }
    return null;
  }

  private getRpcUrl() {
    const rpcConfig = this.getRpcConfig();
    if (rpcConfig) {
      return rpcConfig.node;
    }
    if (config.localChain.enabled) {
      return config.localChain.rpcUrl;
    }
    return null;
  }

  private getContractAddress() {
    return config.localChain.enabled
      ? config.localChain.contractAddress
      : config.nft.contractAddress;
  }

  private ensureReadProvider() {
    if (this.readProvider && this.readContract) {
      return;
    }

    const rpcUrl = this.getRpcUrl();
    if (!rpcUrl) {
      throw new Error("未配置 RPC 节点");
    }

    this.readProvider = new ethers.JsonRpcProvider(rpcUrl);
    this.readContract = new ethers.Contract(
      this.getContractAddress(),
      NFT_ABI,
      this.readProvider
    );
  }

  /**
   * 初始化 provider 和合约实例
   */
  async init() {
    if (typeof window === 'undefined') {
      throw new Error('Window object not available');
    }

    // 检查是否有钱包连接
    const walletClient = await getWalletClient(wagmiConfig);
    if (!walletClient) {
      throw new Error('请先连接钱包');
    }

    const walletAddress = walletClient.account?.address?.toLowerCase() ?? null;

    // 如果已经初始化且钱包地址未变化，直接返回
    if (this.isInitialized && this.contract && walletAddress === this.currentAccount) {
      return;
    }

    // 使用 window.ethereum（RainbowKit 已经管理了连接）
    if (!window.ethereum) {
      throw new Error('MetaMask 未安装');
    }

    // 使用 MetaMask provider
    this.provider = new ethers.BrowserProvider(window.ethereum);
    const network = await this.provider.getNetwork();
    console.log('🌐 当前网络:', network.name, network.chainId);
    
    // 获取 signer
    this.signer = await this.provider.getSigner();
    this.currentAccount = walletAddress;
    
    // 创建合约实例
    const contractAddress = this.getContractAddress();
    this.ensureReadProvider();

    this.contract = new ethers.Contract(
      contractAddress,
      NFT_ABI,
      this.signer
    );

    this.isInitialized = true;
    console.log('✅ EVM 合约服务已初始化');
    console.log('📍 合约地址:', contractAddress);
  }

  /**
   * 铸造 NFT（NINJ4 合约一次仅允许铸造 1 个）
   * @param quantity 铸造数量（必须为 1）
   */
  async mint(quantity: number): Promise<ethers.TransactionReceipt> {
    if (!this.contract) {
      await this.init();
    }

    if (!this.contract) {
      throw new Error('合约未初始化');
    }

    if (quantity !== 1) {
      throw new Error('NINJ4 系列一次只能铸造 1 个 NFT');
    }

    console.log('🔄 铸造 1 个 NINJ4 NFT...');
    const tx = await this.contract.mint();
    console.log('📝 交易已发送:', tx.hash);
    const receipt = await tx.wait();
    console.log('✅ 交易已确认:', receipt);
    return receipt;
  }

  /**
   * 查询总铸造数量
   */
  async getTotalMinted(): Promise<number> {
    try {
      const contract = await this.getReadContract();
      const totalMinted = await contract.totalMinted();
      return Number(totalMinted);
    } catch (error) {
      console.error('查询 totalMinted 失败:', error);
      return 0;
    }
  }

  /**
   * 查询用户已铸造的数量
   * @param address 用户地址
   */
  async getMintedCount(address: string): Promise<number> {
    try {
      const contract = await this.getReadContract();
      const minted = await contract.hasMinted(address);
      return minted ? 1 : 0;
    } catch (error) {
      console.error('查询 minted 失败:', error);
      return 0;
    }
  }

  /**
   * 查询铸造状态
   */
  async isMintActive(): Promise<boolean> {
    if (!this.contract) {
      await this.init();
    }
    // NINJ4 合约没有开关，默认始终可铸造（除非链上达到限额或余额不足）
    return true;
  }

  /**
   * 查询最大供应量
   */
  async getMaxSupply(): Promise<number> {
    try {
      const contract = await this.getReadContract();
      const maxSupply = await contract.maxSupply();
      return Number(maxSupply);
    } catch (error) {
      console.error('查询 MAX_SUPPLY 失败:', error);
      return config.nft.maxSupply;
    }
  }

  /**
   * 查询每个钱包最大铸造数量
   */
  async getMaxPerWallet(): Promise<number> {
    return MAX_PER_WALLET;
  }

  /**
   * 查询用户是否已经铸造过
   */
  async hasMinted(address: string): Promise<boolean> {
    if (!this.contract) {
      await this.init();
    }

    if (!this.contract) {
      return false;
    }

    try {
      return await this.contract.hasMinted(address);
    } catch (error) {
      console.error('查询 hasMinted 失败:', error);
      return false;
    }
  }

  /**
   * 获取合约实例
   */
  getContract() {
    return this.contract;
  }

  /**
   * 获取 provider
   */
  getProvider() {
    return this.provider;
  }

  /**
   * 获取 signer
   */
  getSigner() {
    return this.signer;
  }

  /**
   * 查询用户拥有的所有 NFT token IDs
   * 注意：由于标准 ERC721 没有枚举功能，我们需要遍历所有 token
   * @param owner 用户地址
   */
  async getUserNFTs(owner: string): Promise<number[]> {
    try {
      console.log(`🔍 查询用户 ${owner} 的 NFT...`);
      const contract = await this.getReadContract();
      const totalMinted = await contract.totalMinted();
      const nftIds: number[] = [];

      // 遍历所有已铸造的 token，检查拥有者
      // 为了提高性能，可以批量查询
      const batchSize = 50; // 每批查询50个
      
      for (let i = 1; i <= Number(totalMinted); i += batchSize) {
        const endIndex = Math.min(i + batchSize - 1, Number(totalMinted));
        
        // 创建批量查询 promises
        const promises: Promise<string>[] = [];
        for (let j = i; j <= endIndex; j++) {
          promises.push(contract.ownerOf(j));
        }
        
        // 并行查询
        const owners = await Promise.all(promises);
        
        // 检查哪些 token 属于该用户
        for (let k = 0; k < owners.length; k++) {
          if (owners[k].toLowerCase() === owner.toLowerCase()) {
            nftIds.push(i + k);
          }
        }
      }

      console.log(`✅ 找到 ${nftIds.length} 个 NFT`);
      return nftIds;
    } catch (error) {
      console.error('查询用户 NFT 失败:', error);
      return [];
    }
  }

  /**
   * 获取 NFT token URI
   * @param tokenId token ID
   */
  async getTokenURI(tokenId: number): Promise<string> {
    try {
      const contract = await this.getReadContract();
      const uri = await contract.tokenURI(tokenId);
      return uri;
    } catch (error) {
      console.error('查询 tokenURI 失败:', error);
      return '';
    }
  }

  /**
   * 获取用户 NFT 余额
   * @param owner 用户地址
   */
  async getBalanceOf(owner: string): Promise<number> {
    try {
      const contract = await this.getReadContract();
      const balance = await contract.balanceOf(owner);
      return Number(balance);
    } catch (error) {
      console.error('查询 balanceOf 失败:', error);
      return 0;
    }
  }

  /**
   * 查询用户持有的 NFT（包含 tokenURI）
   */
  async getOwnerTokensWithURI(owner: string): Promise<Array<{ tokenId: number; tokenURI: string }>> {
    if (!owner) {
      return [];
    }

    try {
      const contract = await this.getReadContract();
      const response = await contract.ownerTokensWithURI(owner);
      return response.map((item: { tokenId: bigint; tokenURI: string }) => ({
        tokenId: Number(item.tokenId),
        tokenURI: item.tokenURI,
      }));
    } catch (error) {
      console.error('查询 ownerTokensWithURI 失败:', error);
      return [];
    }
  }
}

// 导出单例
export const evmContractService = new EvmContractService();

export default EvmContractService;
