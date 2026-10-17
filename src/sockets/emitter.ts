import { Server } from "socket.io";
import { SOCKET } from "../utils/consts";
import logger from "../utils/logger";
import { TokenPayload } from "../utils/interfaces/requests";

let io: Server | null = null;

export function setSocketServer(server: Server) {
  io = server;
}

export function getSocketServer() {
  return io;
}

export function emitExample(payload: TokenPayload) {
  if (!io) {
    logger.warn("[sockets/emitter][emitExample] Socket server not ready");
    return;
  }

  io.to(`${SOCKET.ROOMS.USER_PREFIX}${payload.id}`).emit(
    SOCKET.EVENTS.EXAMPLE,
    payload,
  );
}
