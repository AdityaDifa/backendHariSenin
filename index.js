import dotenv from "dotenv";
dotenv.config();

import express from "express";

const port = process.env.PORT || 8000;

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send(`test`);
});

app.listen(port, () => {
  "server is running in port 8000";
});
