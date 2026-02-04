import jwt from "jsonwebtoken";
import { config } from "../config/envConfig.js";

const generateTokens = (userId) => {
  const accessToken = jwt.sign({ userId }, config.accessTokenSecret, {
    expiresIn: config.accessTokenExpiry,
  });

  const refreshToken = jwt.sign({ userId }, config.refreshTokenSecret, {
    expiresIn: config.refreshTokenExpiry,
  });

  return { accessToken, refreshToken };
};

export default generateTokens;
