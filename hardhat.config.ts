import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";

dotenv.config();

const EVM_PRIVATE_KEY = process.env.EVM_PRIVATE_KEY || "";

const BASE_CONTRACT_ADDRESS = process.env.BASE_CONTRACT_ADDRESS || "";
const BASE_TESTNET_RPC_URL = process.env.BASE_TESTNET_RPC_URL || "";
const BASE_MAINNET_RPC_URL = process.env.BASE_MAINNET_RPC_URL || "";

const config: HardhatUserConfig = {
  solidity: "0.8.27",
  networks: {
    baseTestnet: {
      url: BASE_TESTNET_RPC_URL,
      accounts: [EVM_PRIVATE_KEY],
    },
    baseMainnet: {
      url: BASE_MAINNET_RPC_URL,
      accounts: [EVM_PRIVATE_KEY],
    },
  },
};

export default config;
