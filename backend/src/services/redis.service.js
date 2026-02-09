import { redisClient } from "../config/redis.js";

export const storeRefreshToken = async (userId, refreshToken) => {
  await redisClient.set(
    `refresh_token:${userId}`,
    refreshToken,
    "EX",
    7 * 24 * 60 * 60,
  );
};
