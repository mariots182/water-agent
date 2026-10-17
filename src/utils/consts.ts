export const ENV = {
  PRODUCTION: "PRODUCTION",
  DEVELOPMENT: "DEVELOPMENT",
} as const;

export const HTTP = {
  METHODS: {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    PATCH: "PATCH",
    DELETE: "DELETE",
  },
  STATUS_CODES: {
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    CONFLICT: 409,
    UNPROCESSABLE_ENTITY: 422,
    BAD_GATEWAY: 502,
    INTERNAL_SERVER_ERROR: 500,
    SERVICE_UNAVAILABLE: 503,
  },
  HEADERS: {
    CONTENT_TYPE: "content-type",
    AUTHORIZATION: "authorization",
  },
  HEADER_VALUES: {
    APPLICATION_JSON: "application/json",
    BEARER: "bearer",
  },
} as const;

export const SOCKET = {
  ORIGIN: "*",
  METHODS: [HTTP.METHODS.GET, HTTP.METHODS.POST],
  EVENTS: {
    CONNECTION: "connection",
    DISCONNECT: "disconnect",
    JOIN_ROOM: "join_room",
    EXAMPLE: "example",
  },
  ROOMS: {
    USER: "user_room",
    USER_PREFIX: "user:",
  },
  ERRORS: {
    AUTH_MISSING: "Authentication error: Token missing",
    AUTH_INVALID: "Authentication error: Invalid token",
  },
} as const;

export const REDIS = {
  GEO_KEY: "users:locations",
  DATA_KEY_PREFIX: "user:data:",
  EXPIRATION_TIME: 43200,
} as const;
