import express from "express";
import { upload } from "../controllers/controller_upload.js";
import { uploadSingle } from "../middleware/upload.middleware.js";

const router = express.Router();

router.post("/", uploadSingle, upload);

export default router;
