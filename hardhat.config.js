require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: __dirname + "/.env" });

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  //   solidity: "0.5.16",
  solidity: {
    compilers: [
      {
        version: "0.5.16",
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000,
          },
        },
      },
      {
        version: "0.6.6",
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000,
          },
        },
      },
    ],
  },
  settings: {
    optimizer: {
      enabled: true,
      runs: 1000,
    },
  },
  networks: {
    local: {
      url: process.env.LOCAL_RPC_URL,
      accounts: [process.env.LOCAL_PRIVATE_KEY],
    },
    hardhat: {
      forking: {
        enabled: true,
        url: process.env.MAINNET_RPC_URL,
      },
      chainId: 1,
    },
    holesky: {
      url: process.env.MUMBAI_RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API,
  },
  sourcify: {
    enabled: true,
  },
};
