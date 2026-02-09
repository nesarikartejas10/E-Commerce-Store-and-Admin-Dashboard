import Redis from "ioredis";
import { config } from "./envConfig.js";

export const redisClient = new Redis(config.upstashRedisURL);
