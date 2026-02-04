import Redis from "ioredis";
import { config } from "./envConfig.js";

export const redis = new Redis(config.upstashRedisURL);
