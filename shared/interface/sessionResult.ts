import type { ChainTypes, ChainsEnum } from "../enums/chains";
import type { TokenTypes } from "../enums/tokenOptions";

export interface SessionResult {
  dice: IndividualSessionResult;
  coin: IndividualSessionResult;
  race: IndividualSessionResult;
  fruit: IndividualSessionResult;
  currencyBTC: IndividualSessionResult;
  currencyETH: IndividualSessionResult;
  currencyBNB: IndividualSessionResult;
  currencySOL: IndividualSessionResult;
  companyKey: string | undefined;
  companyProfit: ProfitChains;
  gameSessionId: string;
}
export interface IndividualSessionResult {
  results: IndividualCompanyGameResult[];
  profit: ProfitChains;
  winnersCount: { bsc: number; solana: number; ton: number; base: number };
  losersCount: { bsc: number; solana: number; ton: number; base: number };
}

export type ProfitChains = {
  base: { native: number; usdt: number; currencyGameUSD: number };
  bsc: { native: number; usdt: number; currencyGameUSD: number };
  solana: { native: number; usdt: number; currencyGameUSD: number };
  ton: { native: number; usdt: number; currencyGameUSD: number };
};

export type IndividualLivePredictionGameResult = {
  wallet: string;
  stakedAmountInUSD: number;
  token: TokenType;
  payoutInToken: number;
  payoutInUSD: number;
};

export type IndividualCompanyGameResult = {
  wallet: string;
  amount: number;
  type: GameTypes;
  chain: ChainTypes;
  token: TokenTypes;
  side: string | number;
  session: string;
  result: Result;
  payout: number;
};
export enum GameTypes {
  DICE = "dice",
  COIN = "coin",
  RACE = "race",
  FRUIT = "fruit",
}

export enum Result {
  WIN = "win",
  LOSS = "loss",
}

export enum TokenType {
  NATIVE = "native",
  USDT = "usdt",
}

export type CoinPrices = {
  id: number;
  BTC: string;
  ETH: string;
  SOL: string;
  BNB: string;
  createdAt: Date;
  updatedAt: Date;
};
