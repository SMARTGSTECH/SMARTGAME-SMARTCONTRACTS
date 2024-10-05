import type { ChainsEnum } from "../enums/chains";

export interface IWinner {
  winnerAddress: string;
  winnerChain: ChainsEnum;
  amountWon: number;
}
