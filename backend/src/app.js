import express from "express";
import authRouter from "./routes/user.routes.js";
import { globalErrorHandler } from "./middlewares/globalErrorHandler.js";

const app = express();

app.use(express.json());

app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
  res.send("Welcome to ecommerce store");
});

app.use(globalErrorHandler);

export default app;
