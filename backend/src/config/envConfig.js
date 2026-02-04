import dotenv from "dotenv";
dotenv.config();

const _config = {
  port: process.env.PORT,
  mongoURI: process.env.MONGO_URI,
  upstashRedisURL: process.env.UPSTASH_REDIS_URL,
};

export const config = Object.freeze(_config);
