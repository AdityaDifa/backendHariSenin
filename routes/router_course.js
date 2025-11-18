import express from "express";
import {
  getCourses,
  getCourseById,
  patchCourse,
  deleteCourse,
} from "../models/db_course.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const classes = await getCourses();
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id_kelas", async (req, res) => {
  try {
    const classes = await getCourseById(req.params.id_kelas);
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.patch("/:id_kelas", async (req, res) => {
  const id_kelas = req.params.id_kelas;

  const data = req.body;

  try {
    const result = await patchCourse(id_kelas, data);
    res.status(200).json({ message: "Update berhasil", updated: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id_kelas", async (req, res) => {
  const id_kelas = req.params.id_kelas;

  try {
    const result = await deleteCourse(id_kelas);
    res
      .status(200)
      .json({ message: "course berhasil dihapus", response: result });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

export default router;
