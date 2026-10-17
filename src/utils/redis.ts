import { createClient } from "redis";
import logger from "./logger";
import config from "../config";

const { host, port } = config.redis;

const redisUrl = `redis://${host}:${port}`;

const redisClient = createClient({
  url: redisUrl,
  socket: {
    reconnectStrategy: (retries) => Math.min(retries * 50, 2000),
  },
});

redisClient.on("error", (err) =>
  logger.error(`[utils/redis] Redis Client Error: ${err.message}`),
);

export const connectRedis = async () => {
  if (!redisClient.isOpen) {
    await redisClient.connect();

    logger.info("[utils/redis][connectRedis] Conectado a Redis exitosamente");
  }

  return redisClient;
};

export default redisClient;
