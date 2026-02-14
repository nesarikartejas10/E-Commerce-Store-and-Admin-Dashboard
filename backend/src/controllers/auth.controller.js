import { asyncHandler } from "../middlewares/asyncHandler.js";
import createHttpError from "http-errors";
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(createHttpError(400, "All fields are required"));
  }

  const existUser = await User.findOne({ email });
  if (existUser) {
    return next(createHttpError(400, "User already registered"));
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ name, email, password: hashedPassword });

  res
    .status(201)
    .json({ success: true, message: "User registered successfully", newUser });
});
