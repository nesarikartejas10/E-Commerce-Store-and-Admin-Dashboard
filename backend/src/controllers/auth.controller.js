import { asyncHandler } from "../middlewares/asyncHandler.js";
import createHttpError from "http-errors";
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "../config/envConfig.js";

export const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(createHttpError(400, "All fields are required"));
  }

  const existUser = await User.findOne({ email });
  if (existUser) {
    return next(createHttpError(400, "Email already registered"));
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({ name, email, password: hashedPassword });

  res
    .status(201)
    .json({ success: true, message: "User registered successfully" });
});

export const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(createHttpError(400, "all fields are required"));
  }

  const user = await User.findOne({ email });
  if (!user) {
    return next(createHttpError(404, "User not found"));
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return next(createHttpError(401, "Invalid email or password"));
  }

  const token = jwt.sign({ id: user._id }, config.jwtSecret, {
    expiresIn: "7d",
  });

  res.status(200).json({
    success: true,
    message: "User logged in successfully",
    user: { id: user._id, name: user.name, email: user.email },
    token,
  });
});
