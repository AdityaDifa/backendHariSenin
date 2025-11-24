import {
  loginService,
  registerService,
  getTokenByEmailService,
} from "../models/db_user.js";

import { sendEmailService } from "../services/sendEmail.js";

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
const login = async (req, res) => {
  const data = req.body;

  try {
    const result = await loginService(data);
    if (!result.success) {
      return res.status(400).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const sendEmail = async (req, res) => {
  const email = req.body.email;
  const toEmail = req.body.toEmail;

  try {
    const token = await getTokenByEmailService(email);
    const send = await sendEmailService(toEmail, "verify token", token);

    return res
      .status(200)
      .json({ message: "your activation token has been send", report: send });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const verifyEmail = () => {};

export { register, login, sendEmail, verifyEmail };
