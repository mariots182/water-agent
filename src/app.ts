import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import config from "./config";
import os from "os";
import { HTTP } from "./utils/consts";
import { initSocketServer } from "./sockets";
import routes from "./api/routes/routes";
import logger from "./utils/logger";
import { connectRedis } from "./utils/redis";

dotenv.config();

const {
  METHODS: { GET, POST },
  HEADERS: { CONTENT_TYPE, AUTHORIZATION },
} = HTTP;

const getLocalIp = (): string => {
  const interfaces = os.networkInterfaces();

  for (const name of Object.keys(interfaces)) {
    const netList = interfaces[name];

    if (netList) {
      for (const net of netList as any[]) {
        const familyV4 =
          typeof net.family === "string"
            ? net.family === "IPv4"
            : net.family === 4;

        if (familyV4 && !net.internal) {
          return net.address;
        }
      }
    }
  }
  return "localhost";
};

const app = express();
const { corsOrigin, port } = config.app;

const server = http.createServer(app);

initSocketServer(server);

app.use(express.json());
app.use(
  cors({
    origin: corsOrigin,
    methods: [GET, POST],
    allowedHeaders: [CONTENT_TYPE, AUTHORIZATION],
  }),
);

app.use(routes);

async function startServer() {
  try {
    const redisClient = await connectRedis();

    if (!redisClient.isOpen) {
      logger.error("[app][startServer] Redis no está conectado");
    }

    server.listen(port, () => {
      const localIp = getLocalIp();
      logger.info(
        `[app][startServer] Servidor corriendo localmente en: http://localhost:${port}`,
      );
      if (localIp !== "localhost") {
        logger.info(
          `[app][startServer] Servidor corriendo en red local en: http://${localIp}:${port}`,
        );
      }
    });
  } catch (error) {
    logger.error(`[app][startServer] Error fatal al arrancar`, error);
    process.exit(1);
  }
}

startServer();
