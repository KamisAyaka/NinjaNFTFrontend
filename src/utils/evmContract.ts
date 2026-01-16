import { ethers, ZeroAddress } from 'ethers';
import { getWalletClient } from 'wagmi/actions';
import { wagmiConfig } from '../config/wagmi';
import config from '../config';
import NFT_ABI from "../abi/abi.json" assert { type: "json" };

// 默认每个钱包最大铸造数量（会被合约条件覆盖）
const DEFAULT_MAX_PER_WALLET = 1;

// Claim Condition 结构体定义
interface ClaimCondition {
  startTimestamp: bigint;
  maxClaimableSupply: bigint;
  supplyClaimed: bigint;
  quantityLimitPerWallet: bigint;
  merkleRoot: string;
  pricePerToken: bigint;
  currency: string;
  metadata: string;
}

// EVM 合约交互服务类 (适配 ThirdWeb DropERC721)
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

  private getContractAddress() {
    return config.nft.contractAddress;
  }

  private ensureReadProvider() {
    if (this.readProvider && this.readContract) {
      return;
    }

    const rpcUrl = config.chain.node;
    const chainId = config.chain.evmChainId;

    // Injective RPC 不支持批量请求，需要使用 staticNetwork 和禁用批量
    const fetchRequest = new ethers.FetchRequest(rpcUrl);
    this.readProvider = new ethers.JsonRpcProvider(
      fetchRequest,
      chainId,
      { staticNetwork: true, batchMaxCount: 1 }
    );

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
   * 获取当前活跃的 Claim Condition
   */
  async getActiveClaimCondition(): Promise<ClaimCondition | null> {
    try {
      const contract = await this.getReadContract();
      const conditionId = await contract.getActiveClaimConditionId();
      const condition = await contract.getClaimConditionById(conditionId);
      console.log('📦 当前 Claim Condition:', condition);
      return condition;
    } catch (error) {
      console.error('获取 Claim Condition 失败:', error);
      return null;
    }
  }

  /**
   * 铸造 NFT (使用 claim 函数)
   * @param quantity 铸造数量
   */
  async mint(quantity: number): Promise<ethers.TransactionReceipt> {
    if (!this.contract || !this.currentAccount) {
      await this.init();
    }

    if (!this.contract || !this.currentAccount) {
      throw new Error('合约未初始化');
    }

    console.log(`🔄 准备铸造 ${quantity} 个 NFT...`);

    // 1. 获取当前活跃的 Claim Condition
    const condition = await this.getActiveClaimCondition();
    if (!condition) {
      throw new Error('当前没有活跃的销售条件，无法铸造');
    }

    const pricePerToken = condition.pricePerToken;
    const currency = condition.currency;
    const totalPrice = pricePerToken * BigInt(quantity);

    console.log('💰 单价:', ethers.formatEther(pricePerToken), '总价:', ethers.formatEther(totalPrice));
    console.log('💳 支付币种:', currency);

    // 2. 构造 AllowlistProof (公售情况下为空 proof)
    const allowlistProof = {
      proof: [],
      quantityLimitPerWallet: condition.quantityLimitPerWallet,
      pricePerToken: pricePerToken,
      currency: currency
    };

    // 3. 调用 claim 函数
    // claim(receiver, quantity, currency, pricePerToken, allowlistProof, data)
    const isNativeToken = currency === ZeroAddress;

    const tx = await this.contract.claim(
      this.currentAccount,       // _receiver
      quantity,                  // _quantity
      currency,                  // _currency
      pricePerToken,             // _pricePerToken
      allowlistProof,            // _allowlistProof
      "0x",                      // _data (空数据)
      { value: isNativeToken ? totalPrice : 0n }
    );

    console.log('📝 交易已发送:', tx.hash);
    const receipt = await tx.wait();
    console.log('✅ 交易已确认:', receipt);
    return receipt;
  }

  /**
   * 查询总铸造数量 (使用 totalMinted)
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
   * 查询用户已铸造的数量 (基于当前 Claim Condition)
   * @param address 用户地址
   */
  async getMintedCount(address: string): Promise<number> {
    try {
      const contract = await this.getReadContract();
      const conditionId = await contract.getActiveClaimConditionId();
      const supplyClaimed = await contract.getSupplyClaimedByWallet(conditionId, address);
      return Number(supplyClaimed);
    } catch (error) {
      console.error('查询用户铸造数量失败:', error);
      return 0;
    }
  }

  /**
   * 查询铸造状态 (是否有活跃的 Claim Condition)
   */
  async isMintActive(): Promise<boolean> {
    try {
      const condition = await this.getActiveClaimCondition();
      if (!condition) return false;

      const now = BigInt(Math.floor(Date.now() / 1000));
      const started = condition.startTimestamp <= now;
      const hasSupply = condition.maxClaimableSupply === 0n ||
        condition.supplyClaimed < condition.maxClaimableSupply;

      return started && hasSupply;
    } catch {
      return false;
    }
  }

  /**
   * 查询最大供应量 (使用 maxTotalSupply)
   */
  async getMaxSupply(): Promise<number> {
    try {
      const contract = await this.getReadContract();
      const maxSupply = await contract.maxTotalSupply();
      return Number(maxSupply);
    } catch (error) {
      console.error('查询 maxTotalSupply 失败:', error);
      return config.nft.maxSupply;
    }
  }

  /**
   * 查询每个钱包最大铸造数量 (从当前 Claim Condition 获取)
   */
  async getMaxPerWallet(): Promise<number> {
    try {
      const condition = await this.getActiveClaimCondition();
      if (condition && condition.quantityLimitPerWallet > 0n) {
        return Number(condition.quantityLimitPerWallet);
      }
      return DEFAULT_MAX_PER_WALLET;
    } catch {
      return DEFAULT_MAX_PER_WALLET;
    }
  }

  /**
   * 查询用户是否已经达到铸造限额
   */
  async hasMinted(address: string): Promise<boolean> {
    try {
      const minted = await this.getMintedCount(address);
      const maxPerWallet = await this.getMaxPerWallet();
      return minted >= maxPerWallet;
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

      for (let i = 0; i < Number(totalMinted); i += batchSize) {
        const endIndex = Math.min(i + batchSize, Number(totalMinted));

        // 创建批量查询 promises
        const promises: Promise<string>[] = [];
        for (let j = i; j < endIndex; j++) {
          promises.push(contract.ownerOf(j).catch(() => ZeroAddress));
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
   * 注意：新合约可能没有 ownerTokensWithURI，改用 getUserNFTs + getTokenURI
   */
  async getOwnerTokensWithURI(owner: string): Promise<Array<{ tokenId: number; tokenURI: string }>> {
    if (!owner) {
      return [];
    }

    try {
      const tokenIds = await this.getUserNFTs(owner);
      const results: Array<{ tokenId: number; tokenURI: string }> = [];

      for (const tokenId of tokenIds) {
        const tokenURI = await this.getTokenURI(tokenId);
        results.push({ tokenId, tokenURI });
      }

      return results;
    } catch (error) {
      console.error('查询 ownerTokensWithURI 失败:', error);
      return [];
    }
  }
}

// 导出单例
export const evmContractService = new EvmContractService();

export default EvmContractService;
