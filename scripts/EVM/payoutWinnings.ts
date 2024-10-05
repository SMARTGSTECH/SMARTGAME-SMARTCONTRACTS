import hre from "hardhat";
import dotenv from "dotenv";
import { ChainsEnum } from "../../shared/enums/chains";
import type { IWinner } from "../../shared/interface/winners";
import { TokenOptionsEnum } from "../../shared/enums/tokenOptions";
import * as ethers from "ethers";

dotenv.config();

const EVM_PRIVATE_KEY = process.env.EVM_PRIVATE_KEY || "";

const BASE_TESTNET_SMARTBET_CONTRACT_ADDRESS = process.env.BASE_TESTNET_SMARTBET_CONTRACT_ADDRESS || "";

const BASE_MAINNET_SMARTBET_CONTRACT_ADDRESS = process.env.BSC_MAINNET_SMARTBET_CONTRACT_ADDRESS || "";

const payoutWinnigs = async (chain: ChainsEnum, winners: IWinner[], tokenOption: TokenOptionsEnum) => {
  let SMARTBET_CONTRACT_ADDRESS = "";
  let wallet: ethers.ethers.Wallet | undefined;


  if (chain === ChainsEnum.BASE_TESTNET) {
    SMARTBET_CONTRACT_ADDRESS = BASE_TESTNET_SMARTBET_CONTRACT_ADDRESS;

    const provider = new ethers.JsonRpcProvider(process.env.BASE_TESTNET_RPC_URL);

    wallet = new ethers.Wallet(EVM_PRIVATE_KEY, provider);
  }

  if (chain === ChainsEnum.BASE_MAINNET) {
    SMARTBET_CONTRACT_ADDRESS = BASE_MAINNET_SMARTBET_CONTRACT_ADDRESS;

    const provider = new ethers.JsonRpcProvider(process.env.BASE_MAINNET_RPC_URL);

    wallet = new ethers.Wallet(EVM_PRIVATE_KEY, provider);
  }

  if (!SMARTBET_CONTRACT_ADDRESS || !wallet) throw new Error("Invalid chain");

  const [company] = await hre.ethers.getSigners();

  const SmartBetHardHat = await hre.ethers.getContractFactory("SmartBet", company);

  const smartBet = new ethers.Contract(SMARTBET_CONTRACT_ADDRESS, SmartBetHardHat.interface, wallet);

  if (tokenOption === TokenOptionsEnum.NATIVE) {
    console.log("Sending Native Token Payout for network: ", chain);
    const tx = await smartBet.gamePayoutNativeToken(winners);

    await tx.wait();
    console.log("Payout successful");
    console.log("TX hash: ", tx.hash);
  }

  if (tokenOption === TokenOptionsEnum.USDT) {
    console.log("Sending USDT Token Payout for network: ", chain);
    const tx = await smartBet.gamePayoutUSDT(winners);

    await tx.wait();
    console.log("Payout successful");
    console.log("TX hash: ", tx.hash);
  }
};

export default payoutWinnigs;
