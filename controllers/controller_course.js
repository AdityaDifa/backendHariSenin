import {
  getCoursesService,
  getCourseByIdService,
  getCoursesFilterCategoryService,
  getCoursesSearchService,
  patchCourseService,
  deleteCourseService,
  createCourseService,
  getCourseSortPriceService,
} from "../models/db_course.js";

const getCourses = async (req, res) => {
  try {
    const classes = await getCoursesService();
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCoursesById = async (req, res) => {
  try {
    const classes = await getCourseByIdService(req.params.id_kelas);
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCoursesFilterCategory = async (req, res) => {
  const category = req.query.category;
  try {
    const classes = await getCoursesFilterCategoryService(category);
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCoursesSortHarga = async (req, res) => {
  const sort = req.query.sort.toUpperCase();

  if (sort !== "ASC" && sort !== "DESC") {
    return res.status(400).json({ message: "put ASC or DESC" });
  }
  try {
    const classes = await getCourseSortPriceService(sort);
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCoursesSearch = async (req, res) => {
  const search = req.query.search;

  try {
    const classes = await getCoursesSearchService(search);
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const patchCourse = async (req, res) => {
  const id_kelas = req.params.id_kelas;

  const data = req.body;

  try {
    const result = await patchCourseService(id_kelas, data);
    res.status(200).json({ message: "Update berhasil", updated: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCourse = async (req, res) => {
  const id_kelas = req.params.id_kelas;

  try {
    const result = await deleteCourseService(id_kelas);
    res
      .status(200)
      .json({ message: "course berhasil dihapus", response: result });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const createCourse = async (req, res) => {
  const {
    id_kategori,
    id_tutor,
    judul_kelas,
    ringkasan,
    deskripsi,
    harga,
    diskon,
  } = req.body;

  try {
    const result = await createCourseService({
      id_kategori,
      id_tutor,
      judul_kelas,
      ringkasan,
      deskripsi,
      harga,
      diskon,
    });

    res.status(201).json({
      message: "Course berhasil dibuat",
      id_kelas: result.insertId,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  getCourses,
  getCoursesById,
  getCoursesFilterCategory,
  getCoursesSortHarga,
  getCoursesSearch,
  patchCourse,
  deleteCourse,
  createCourse,
};
