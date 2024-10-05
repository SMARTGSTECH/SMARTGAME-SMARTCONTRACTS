import { Result, type SessionResult } from "../../shared/interface/sessionResult";
import payoutProfit from "../../scripts/EVM/payoutProfit";
import payoutWinnings from "../../scripts/EVM/payoutWinnings";
import { ChainsEnum } from "../../shared/enums/chains";
import { TokenOptionsEnum } from "../../shared/enums/tokenOptions";
import type { IWinner } from "../../shared/interface/winners";
import SocketClientService from "../../utils/socket-client";
import dotenv from "dotenv";
import type { ResultEventData } from "../../shared/interface/socket";

dotenv.config();
const COMPANY_KEY = process.env.COMPANY_KEY;

async function handleAutoSessionBASE(sessionResult: SessionResult, resultEvent: ResultEventData) {
  const profitNative = sessionResult.companyProfit.base.native;
  const profitUSDT = sessionResult.companyProfit.base.usdt;
  const profitCurrencyGameUSD = sessionResult.companyProfit.base.currencyGameUSD;

  const currencyBTC_Session = sessionResult.currencyBTC;
  const currencyBNB_Session = sessionResult.currencyBNB;
  const currencyETH_Session = sessionResult.currencyETH;
  const currencySOL_Session = sessionResult.currencySOL;

  const CURRENT_CHAIN = ChainsEnum.BASE_MAINNET;

  if (profitNative) {
    console.log("SENDING NATIVE BASE ETH PROFIT FROM GAMES\n");

    await payoutProfit(CURRENT_CHAIN, profitNative, TokenOptionsEnum.NATIVE);

    console.log("SENT NATIVE BASE ETH  PROFIT FROM GAMES\n");
  }

  if (profitUSDT) {
    console.log("SENDING USDT PROFIT FROM GAMES\n");

    await payoutProfit(CURRENT_CHAIN, profitUSDT, TokenOptionsEnum.USDT);

    console.log("SENT USDT PROFIT FROM GAMES\n");
  }

  if (profitCurrencyGameUSD) {
    console.log("SENDING USD PROFIT FROM CurrencyGame\n");

    //TODO: Change to NATIVE if needed

    await payoutProfit(CURRENT_CHAIN, profitUSDT * Number(resultEvent.data.eth), TokenOptionsEnum.NATIVE);

    console.log("SENT USD PROFIT FROM CurrencyGame\n");
  }

  if (currencyBTC_Session.winnersCount.base > 1) {
    console.log("SENDING BTC LIVE PREDICTION GAME REWARD PAYOUT\n");

    const winners: IWinner[] = currencyBTC_Session.results
      .map((userResult) => {
        if (userResult.result === Result.WIN) {
          const winner: IWinner = {
            winnerAddress: userResult.wallet,
            winnerChain: CURRENT_CHAIN,
            amountWon: userResult.payout * Number(resultEvent.data.eth),
          };
          return winner;
        }
      })
      .filter((winner): winner is IWinner => winner !== undefined);

    await payoutWinnings(CURRENT_CHAIN, winners, TokenOptionsEnum.NATIVE);
  }

  if (currencyBNB_Session.winnersCount.base > 1) {
    console.log("SENDING BNB LIVE PREDICTION GAME REWARD PAYOUT\n");

    const winners: IWinner[] = currencyBTC_Session.results
      .map((userResult) => {
        if (userResult.result === Result.WIN) {
          const winner: IWinner = {
            winnerAddress: userResult.wallet,
            winnerChain: CURRENT_CHAIN,
            amountWon: userResult.payout * Number(resultEvent.data.eth),
          };
          return winner;
        }
      })
      .filter((winner): winner is IWinner => winner !== undefined);

    await payoutWinnings(CURRENT_CHAIN, winners, TokenOptionsEnum.NATIVE);
  }

  if (currencyETH_Session.winnersCount.base > 1) {
    console.log("SENDING ETH LIVE PREDICTION GAME REWARD PAYOUT\n");

    const winners: IWinner[] = currencyBTC_Session.results
      .map((userResult) => {
        if (userResult.result === Result.WIN) {
          const winner: IWinner = {
            winnerAddress: userResult.wallet,
            winnerChain: CURRENT_CHAIN,
            amountWon: userResult.payout * Number(resultEvent.data.eth),
          };
          return winner;
        }
      })
      .filter((winner): winner is IWinner => winner !== undefined);

    await payoutWinnings(CURRENT_CHAIN, winners, TokenOptionsEnum.NATIVE);
  }

  if (currencySOL_Session.winnersCount.base > 1) {
    console.log("SENDING SOL LIVE PREDICTION GAME REWARD PAYOUT\n");

    const winners: IWinner[] = currencyBTC_Session.results
      .map((userResult) => {
        if (userResult.result === Result.WIN) {
          const winner: IWinner = {
            winnerAddress: userResult.wallet,
            winnerChain: CURRENT_CHAIN,
            amountWon: userResult.payout * Number(resultEvent.data.eth),
          };
          return winner;
        }
      })
      .filter((winner): winner is IWinner => winner !== undefined);

    await payoutWinnings(CURRENT_CHAIN, winners, TokenOptionsEnum.NATIVE);
  }
}

const socket = new SocketClientService(
  `wss://server.smartcryptobet.co?securedKey=${COMPANY_KEY}`,
  handleAutoSessionBASE
);

console.log("Started BASE server");

socket.connect();
