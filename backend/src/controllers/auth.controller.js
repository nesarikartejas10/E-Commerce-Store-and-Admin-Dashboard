import User from "../models/user.model.js";
import generateTokens from "../services/token.service.js";

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
    const { acceessToken, refreshToken } = generateTokens(user._id);

    res.status(201).json({ user, message: "User created successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const login = async () => {};

const logout = async () => {};

export { signup, login, logout };
