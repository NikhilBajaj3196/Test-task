require("@nomicfoundation/hardhat-toolbox");
require('@typechain/hardhat')
require('@nomicfoundation/hardhat-ethers')
require('@nomicfoundation/hardhat-chai-matchers')

/** @type import('hardhat/config').HardhatUserConfig */
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
  include: ["./scripts", "./test", "./typechain-types"],
  files: ["./hardhat.config.ts"]
};
