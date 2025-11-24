import pool from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

async function registerService(data) {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const newToken = uuidv4();

  const values = [
    data.fullname,
    data.username,
    data.email,
    hashedPassword,
    newToken,
  ];

  //check if there is an email used
  const sqlCheckEmail = `SELECT 1 FROM user2 WHERE email = ? LIMIT 1`;
  const [rows] = await pool.query(sqlCheckEmail, data.email);

  if (rows.length > 0) {
    return { report: "email has been used" };
  }

  const sql = `INSERT INTO user2 (fullname, username, email, password, token) VALUES (?,?,?,?,?)`;

  const [result] = await pool.query(sql, values);
  return result;
}

async function loginService(data) {
  const sqlCheckEmail = `SELECT * FROM user2 WHERE email = ? LIMIT 1`;
  const [rows] = await pool.query(sqlCheckEmail, data.email);

  if (rows.length == 0) {
    return { success: false, message: "email not found" };
  }

  const user = rows[0];

  const match = await bcrypt.compare(data.password, user.password);
  if (!match) {
    return { success: false, message: "incorrect password" };
  }

  //create token
  const token = jwt.sign(
    {
      fullname: user.fullname,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return {
    success: true,
    token: token,
    message: "success login",
    fullname: user.fullname,
    username: user.username,
    email: user.email,
  };
}

async function getTokenByEmailService(email) {
  const sql = `SELECT token FROM user2 WHERE email= ?`;
  const [rows] = await pool.query(sql, [email]);

  if (rows.length === 0) {
    return { success: false, message: "put correct email" };
  }

  return rows[0].token;
}

export { registerService, loginService, getTokenByEmailService };
