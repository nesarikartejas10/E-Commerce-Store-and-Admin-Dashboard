import { config } from "../config/envConfig.js";

export const globalErrorHandler = (error, req, res, next) => {
  const statusCode = error.statusCode || 500;

  return res.status(statusCode).json({
    success: false,
    message: error.message,
    errorStack: config.env === "production" ? null : error.stack,
  });
};
