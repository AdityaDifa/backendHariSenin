import course from "./routes/router_course.js";
import user from "./routes/router_user.js";
import upload from "./routes/router_upload.js";
import express from "express";

import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 8000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/course", course);
app.use("/user", user);
app.use("/upload", upload);

app.listen(port, () => {
  "server is running in port 8000";
});
