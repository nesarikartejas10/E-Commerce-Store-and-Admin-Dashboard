import Redis from "ioredis";
import { config } from "./envConfig.js";

const redis = new Redis(config.upstashRedisURL);
