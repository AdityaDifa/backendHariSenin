import course from "./routes/router_course.js";
import express from "express";

import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 8000;

const app = express();
app.use(express.json());

app.use("/course", course);

app.listen(port, () => {
  "server is running in port 8000";
});
