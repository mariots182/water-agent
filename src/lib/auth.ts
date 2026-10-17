import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config";
import { TokenPayload } from "../utils/interfaces/requests";

const SALT_ROUNDS = 10;

export const hashPassword = async (plain: string): Promise<string> => {
  return bcrypt.hash(plain, SALT_ROUNDS);
};

export const comparePassword = async (
  plain: string,
  hash: string,
): Promise<boolean> => {
  return bcrypt.compare(plain, hash);
};

export const generateAccessToken = (user: TokenPayload): string => {
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };

  return jwt.sign(payload, config.jwt.secret as string, {
    expiresIn: "1h",
  });
};

export const generateRefreshToken = (user: { id: string }): string => {
  return jwt.sign({ sub: user.id }, config.jwt.secret as string, {
    expiresIn: "8h",
  });
};

export const verifyRefreshToken = (token: string): { sub: string } => {
  const decoded = jwt.verify(token, config.jwt.secret as string) as any;
  return { sub: String(decoded.sub) };
};

export const verifyToken = (token: string): TokenPayload => {
  const decoded = jwt.verify(token, config.jwt.secret as string) as Partial<
    TokenPayload & { sub: string }
  >;

  if (!decoded.id || !decoded.email || !decoded.role) {
    throw new Error("Invalid access token payload");
  }

  return {
    id: decoded.id,
    email: decoded.email,
    role: decoded.role,
  };
};

export const decodeToken = (token: string) => {
  return jwt.decode(token);
};
