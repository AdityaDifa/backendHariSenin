import { registerService } from "../models/db_user.js";

const register = async (req, res) => {
  const data = req.body;

  try {
    const result = await registerService(data);

    if (result.report == "email has been used") {
      return res.status(400).json({ message: result.report });
    }

    res.status(201).json({ message: "account created", result: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const login = () => {};
const verifyEmail = () => {};

export { register, login, verifyEmail };
