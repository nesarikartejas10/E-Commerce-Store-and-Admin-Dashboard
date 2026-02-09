import { config } from "../config/envConfig.js";
import { redisClient } from "../config/redis.js";
import User from "../models/user.model.js";
import { storeRefreshToken } from "../services/redis.service.js";
import generateTokens from "../services/token.service.js";
import { setCookies } from "../utils/cookie.js";
import jwt from "jsonwebtoken";

const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ name, email, password });
    const { accessToken, refreshToken } = generateTokens(user._id);

    //store refresh token in redis
    await storeRefreshToken(user._id, refreshToken);

    //set cookies
    setCookies(res, accessToken, refreshToken);

    res.status(201).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      message: "User created successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.comparePassword(password))) {
      const { accessToken, refreshToken } = generateTokens(user._id);
      await storeRefreshToken(user._id, refreshToken);
      setCookies(res, accessToken, refreshToken);

      res.status(200).json({
        message: "User logged in",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } else {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken) {
      const decoded = jwt.verify(refreshToken, config.refreshTokenSecret);
      await redisClient.del(`refresh_token:${decoded.userId}`);

      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");
      res.status(200).json({ message: "Logged out successfully" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export { signup, login, logout };
