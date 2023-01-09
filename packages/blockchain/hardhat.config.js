require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    localhost: {
      networkType: "local",
      chainId: 1337,
    },
    hardhat: {
      networkType: "local",
      chainId: 1337,
    },
    goerli: {
      networkType: "testnet",
      chainId: 5,
      url: process.env.API_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
