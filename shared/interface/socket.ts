export type CoinPrices = {
  id: number;
  BTC: string;
  ETH: string;
  SOL: string;
  BNB: string;
  TON: string;
  createdAt: Date;
  updatedAt: Date;
};

export type GameStart = {
  session: string;
  initials: {
    BTC: number;
    ETH: number;
    SOL: number;
    BNB: number;
  };
};

export type CoinCompare = {
  value: {
    BTC: number;
    ETH: number;
    SOL: number;
    BNB: number;
  };
};

export type ResultEventData = {
  data: {
    id: number;
    coin: string;
    dice: number;
    race: string;
    fruit: string;
    sol: string;
    eth: string;
    bnb: string;
    btc: string;
    session: string;
    createdAt: Date;
  };
};
