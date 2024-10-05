import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import hre from "hardhat";
import dotenv from "dotenv";

dotenv.config();
const JAN_1ST_2030 = 1893456000;

const COMPANY_EVM_WALLET_ADDRESS = "0x580922449448ECe6A3d18102daf636A95F97781E";

const BASE_TESTNET_USDT_CONTRACT_ADDRESS =
  process.env.BASE_TESTNET_USDT_CONTRACT_ADDRESS || "";

const BASE_MAINNET_USDC_CONTRACT_ADDRESS =
  process.env.BASE_MAINNET_USDC_CONTRACT_ADDRESS || "";

const SmartBetModule = buildModule("SmartBetModule", (m) => {
  const companyAddress = m.getParameter(
    "companyAddress",
    COMPANY_EVM_WALLET_ADDRESS
  );

  // biome-ignore lint/suspicious/noImplicitAnyLet: <explanation>
  let usdtContractAddress;

  if (hre.network.name === "baseTestnet")
    usdtContractAddress = m.getParameter(
      "usdtAddress",
      BASE_TESTNET_USDT_CONTRACT_ADDRESS
    );

  if (hre.network.name === "baseMainnet")
    usdtContractAddress = m.getParameter(
      "usdtAddress",
      BASE_MAINNET_USDC_CONTRACT_ADDRESS
    );

  if (!usdtContractAddress) throw new Error("USDT contract address not found");

  const smartBet = m.contract("SmartBet", [
    companyAddress,
    usdtContractAddress,
  ]);

  return { smartBet };
});

export default SmartBetModule;
