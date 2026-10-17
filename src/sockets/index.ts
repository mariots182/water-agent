import { Server as HttpServer } from "http";
import { Server } from "socket.io";
import { SOCKET } from "../utils/consts";
import { setSocketServer } from "./emitter";
import logger from "../utils/logger";
import { verifyToken } from "../lib/auth";
import config from "../config";

const { EVENTS, ERRORS, METHODS } = SOCKET;
const { AUTH_INVALID, AUTH_MISSING } = ERRORS;
const { CONNECTION } = EVENTS;

export const initSocketServer = (server: HttpServer) => {
  const io = new Server(server, {
    cors: {
      origin: config.app.corsOrigin,
      methods: [...METHODS],
    },
  });

  setSocketServer(io);

  io.use((socket, next) => {
    const token = socket.handshake.auth.token;

    if (!token) {
      return next(new Error(AUTH_MISSING));
    }

    try {
      const decoded = verifyToken(token);
      socket.data.userId = decoded.id;
      socket.data.role = decoded.role;
      next();
    } catch (err) {
      return next(new Error(AUTH_INVALID));
    }
  });

  io.on(CONNECTION, (socket) => {
    const { userId } = socket.data;

    socket.join(`${SOCKET.ROOMS.USER_PREFIX}${userId}`);

    logger.info(
      `[sockets/index][initSocketServer] Cliente conectado: ${socket.id} y unido a la sala: ${SOCKET.ROOMS.USER_PREFIX}${userId}`,
    );

    socket.on(EVENTS.DISCONNECT, () => {
      logger.info(
        `[sockets/index][initSocketServer] Cliente desconectado: ${socket.id}`,
      );
    });
  });

  return io;
};
