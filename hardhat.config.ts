import "@nomicfoundation/hardhat-toolbox";
import "@typechain/hardhat";
import "@nomicfoundation/hardhat-ethers";
import "@nomicfoundation/hardhat-chai-matchers";
import * as dotenv from "dotenv";

dotenv.config();
const DEPLOYER_PRIVATE_KEY = process.env.DEPLOYER_PRIVATE_KEY;

module.exports = {
  solidity: "0.8.20",
  compilerOptions: {
    "target": "es2018",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "outDir": "dist",
    "resolveJsonModule": true
  },
  include: ["./scripts", "./test", "./typechain"],
  files: ["./hardhat.config.ts"],
  networks: {
    hardhat: isFork(),
    bsctestnet: {
      url: process.env.ARCHIVE_NODE_bsctestnet || "https://data-seed-prebsc-1-s1.binance.org:8545",
      chainId: 97,
      live: true,
      gasPrice: 20000000000,
      accounts: DEPLOYER_PRIVATE_KEY ? [`0x${DEPLOYER_PRIVATE_KEY}`] : [],
    }
  },
  etherscan: {
    apiKey: {
      bscTestnet: process.env.ETHERSCAN_API_KEY || "ETHERSCAN_API_KEY",
    }
  },
  accounts: DEPLOYER_PRIVATE_KEY ? [`0x${DEPLOYER_PRIVATE_KEY}`] : [],
};

function isFork() {
  return process.env.FORK === "true"
    ? {
        allowUnlimitedContractSize: false,
        loggingEnabled: false,
        forking: {
          url:
            process.env[`ARCHIVE_NODE_${process.env.FORKED_NETWORK}`] ||
            "https://data-seed-prebsc-1-s1.binance.org:8545",
          blockNumber: 26349263,
        },
        accounts: {
          accountsBalance: "1000000000000000000",
        },
        live: false,
      }
    : {
        allowUnlimitedContractSize: true,
        loggingEnabled: false,
        live: false,
      };
}
