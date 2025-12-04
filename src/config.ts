// NFT 项目配置文件
export const config = {
  // 网络类型：'local' | 'testnet' | 'mainnet'
  networkType: "testnet" as "local" | "testnet" | "mainnet",

  // 本地测试链配置
  localChain: {
    enabled: false, // 禁用本地测试链
    rpcUrl: "http://localhost:8545",
    chainId: 31337, // Anvil 默认 chainId
    contractAddress: "0x5FbDB2315678afecb367f032d93F642f64180aa3", // NINJ4 合约地址（示例）
  },

  // NFT 合约配置
  nft: {
    // 你的合约地址 - 部署后需要更新这个地址
    contractAddress: "0x2B11c9C19fdAeE8dB3f63b54fbb3077Fb455C683", // 部署后的 NINJ4 合约地址

    // 合约配置参数
    maxSupply: 500,
    maxPerWallet: 1,

    // 代币信息
    name: "NINJ4",
    symbol: "NINJ4",
    description: "NINJ4 limited collection",
  },

  // Injective 链配置 (根据官方文档)
  chain: {
    // 主网 (Mainnet)
    mainnet: {
      chainId: "injective-1",
      evmChainId: 1776, // EVM Chain ID
      node: "https://sentry.tm.injective.network:443",
      name: "Injective Mainnet",
      explorer: "https://explorer.injective.network",
    },
    // 测试网 (Testnet)
    testnet: {
      chainId: "injective-888",
      evmChainId: 1439, // EVM Chain ID
      node: "https://k8s.testnet.json-rpc.injective.network/",
      name: "Injective Testnet",
      explorer: "https://testnet.blockscout.injective.network/",
      explorerApi: "https://testnet.blockscout-api.injective.network/api",
      wsEndpoint: "https://k8s.testnet.ws.injective.network/",
      faucet: "https://testnet.faucet.injective.network/",
    },
    // 开发网 (Devnet)
    devnet: {
      chainId: "injective-777",
      node: "https://devnet.sentry.tm.injective.network:443",
      name: "Injective Devnet",
      explorer: "https://devnet.explorer.injective.network",
    },
  },

  // 应用配置
  app: {
    name: "N1NJ4 NFT",
    description: "N1NJ4 NFT Collection on Injective",
    links: {
      twitter: "https://x.com/ninjalabscn",
      discord: "https://discord.gg/ninjalabs",
      github: "https://github.com/Ninja-Labs-CN",
    },
  },
};

export default config;
