import express from "express";
import {
  getCourses,
  getCoursesById,
  getCoursesFilterCategory,
  getCoursesSearch,
  getCoursesSortHarga,
  patchCourse,
  deleteCourse,
  createCourse,
} from "../controllers/controller_course.js";

import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/", verifyToken, getCourses);

router.get("/category", getCoursesFilterCategory);

router.get("/sortPrice", getCoursesSortHarga);

router.get("/search", getCoursesSearch);

router.get("/:id_kelas", verifyToken, getCoursesById);

router.patch("/:id_kelas", verifyToken, patchCourse);

router.delete("/:id_kelas", verifyToken, deleteCourse);

router.post("/", verifyToken, createCourse);

export default router;
