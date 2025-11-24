import express from "express";
import {
  getCourses,
  getCoursesById,
  patchCourse,
  deleteCourse,
  createCourse,
} from "../controllers/controller_course.js";

const router = express.Router();

router.get("/", getCourses);

router.get("/:id_kelas", getCoursesById);

router.patch("/:id_kelas", patchCourse);

router.delete("/:id_kelas", deleteCourse);

router.post("/", createCourse);

export default router;
