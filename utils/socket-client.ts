import { type Socket, io } from "socket.io-client";
import { getSessionResult } from "./api";
import type {
  CoinPrices,
  SessionResult,
} from "../shared/interface/sessionResult";
import type { GameStart, ResultEventData } from "../shared/interface/socket";

export default class SocketClientService {
  socket: Socket | null = null;
  socketURL: string;
  sessionHandler: (
    sessionResult: SessionResult,
    resultEvent: ResultEventData
  ) => Promise<void>;

  constructor(
    socketURL: string,
    sessionHandler: (
      sessionResult: SessionResult,
      resultEvent: ResultEventData
    ) => Promise<void>
  ) {
    this.socketURL = socketURL;
    this.sessionHandler = sessionHandler;
  }

  connect() {
    this.socket = io(this.socketURL);

    this.socket.on("connect", () => {
      console.log("Connected to the server");
    });

    this.socket.on("result", async (data: ResultEventData) => {
      try {
        const sessionResult = (await getSessionResult()) as SessionResult;

        console.log(sessionResult);

        await this.sessionHandler(sessionResult, data);
      } catch (e) {
        console.log(e);
      }
    });

    this.socket.on("gamestart", (data: GameStart) => {
      console.log("gamestart", data);
    });

    // this.socket.on("coincompare", (data: CoinPrices) => {
    //   console.log("coincompare", data);
    // });

    this.socket.on("disconnect", () => {
      console.log("Disconnected from the server");
    });
  }
}
