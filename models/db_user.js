import pool from "../config/db.js";
import bcrypt from "bcryptjs";

async function registerService(data) {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const values = [data.fullname, data.username, data.email, hashedPassword];

  //check if there is an email used
  const sqlCheckEmail = `SELECT 1 FROM user2 WHERE email = ? LIMIT 1`;
  const [rows] = await pool.query(sqlCheckEmail, data.email);

  if (rows.length > 0) {
    return { report: "email has been used" };
  }

  const sql = `INSERT INTO user2 (fullname, username, email, password) VALUES (?,?,?,?)`;

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

  return {
    success: true,
    message: "success login",
    fullname: user.fullname,
    username: user.username,
    email: user.email,
  };
}

export { registerService, loginService };
