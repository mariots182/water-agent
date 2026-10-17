import dotenv from "dotenv";
import { ENV } from "./utils/consts";

dotenv.config();

const DEFAULTS = {
  APP_PORT: "3000",
  CORS_ORIGIN_LOCAL: "http://localhost:3000",
  LOG_LEVEL: "info",
  REDIS_HOST: "localhost",
  REDIS_PORT: "6379",
} as const;

const required = (name: string): string => {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
};

const optional = (name: string, fallback: string): string => {
  return process.env[name] ?? fallback;
};

const { PRODUCTION } = ENV;

const {
  REDIS_PASSWORD,
  GOOGLE_GEOLOCATION_API_KEY,
  GOOGLE_GEOLOCATION_API_URL,
  GOOGLE_ROUTES_API_KEY,
  GOOGLE_ROUTES_URL,
  GOOGLE_ROUTES_FIELD_MASK,
  PGUSER,
  PGPASSWORD,
  PGHOST,
  PGPORT,
  STRIPE_SECRET_KEY,
  EXPO_PUSH_URL,
} = process.env;

export default {
  app: {
    env: optional("NODE_ENV", ENV.DEVELOPMENT),
    port: Number(optional("PORT", DEFAULTS.APP_PORT)),
    corsOrigin:
      process.env.NODE_ENV === PRODUCTION
        ? required("CORS_ORIGIN_PROD")
        : optional("CORS_ORIGIN_LOCAL", DEFAULTS.CORS_ORIGIN_LOCAL),
  },

  logger: {
    level: optional("LOG_LEVEL", DEFAULTS.LOG_LEVEL),
  },

  database: {
    url: required("DATABASE_URL"),
    user: PGUSER,
    password: PGPASSWORD,
    host: PGHOST,
    port: PGPORT,
  },

  redis: {
    host: optional("REDIS_HOST", DEFAULTS.REDIS_HOST),
    port: optional("REDIS_PORT", DEFAULTS.REDIS_PORT),
    password: REDIS_PASSWORD,
  },

  google: {
    geolocation: {
      apiKey: GOOGLE_GEOLOCATION_API_KEY,
      geocodingURL: GOOGLE_GEOLOCATION_API_URL,
    },
    routes: {
      apiKey: GOOGLE_ROUTES_API_KEY,
      url: GOOGLE_ROUTES_URL,
      fieldMask: GOOGLE_ROUTES_FIELD_MASK,
    },
  },

  jwt: {
    secret: required("JWT_SECRET"),
  },

  stripe: {
    secretKey: STRIPE_SECRET_KEY,
  },

  expo: {
    url: EXPO_PUSH_URL,
  },
};
