import express from "express";
import { register } from "../controllers/controller_user.js";

const router = express.Router();

router.post("/register", register);

// router.post("/login");

// router.get("/verify-email");

export default router;
