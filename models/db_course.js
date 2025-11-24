import pool from "../config/db.js";

async function getCoursesService() {
  const result = await pool.query("SELECT * FROM kelas");
  return result[0];
}

async function getCourseByIdService(id) {
  const result = await pool.query(`SELECT * FROM kelas WHERE id_kelas = ${id}`);
  return result[0];
}

async function getCoursesFilterCategoryService(category) {
  const result = await pool.query(
    `SELECT k.* FROM kelas k JOIN kategori_kelas c ON k.id_kategori = c.id_jenis WHERE c.kategori = "${category}"`
  );
  return result[0];
}

async function getCourseSortPriceService(sort) {
  const result = await pool.query(`SELECT * FROM kelas ORDER BY harga ${sort}`);
  return result[0];
}

async function patchCourseService(id_kelas, data) {
  const fields = [];
  const values = [];

  for (const key in data) {
    if (data[key] !== undefined) {
      fields.push(`${key} = ?`);
      values.push(data[key]);
    }
  }

  if (fields.length === 0) throw new Error("Tidak ada data untuk diupdate");

  const sql = `
      UPDATE kelas 
      SET ${fields.join(", ")} 
      WHERE id_kelas = ?
    `;

  await pool.query(sql, [...values, id_kelas]);

  return data;
}

async function deleteCourseService(id_kelas) {
  const result = await pool.query(
    `DELETE FROM kelas WHERE id_kelas = ${id_kelas}`
  );
  return result;
}

async function createCourseService(data) {
  const sql = `
    INSERT INTO kelas 
    (id_kategori, id_tutor, judul_kelas, ringkasan, deskripsi, harga, diskon)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    data.id_kategori,
    data.id_tutor,
    data.judul_kelas,
    data.ringkasan,
    data.deskripsi,
    data.harga,
    data.diskon,
  ];

  const [result] = await pool.query(sql, values);
  return result;
}

export {
  getCoursesService,
  getCourseByIdService,
  getCoursesFilterCategoryService,
  getCourseSortPriceService,
  patchCourseService,
  deleteCourseService,
  createCourseService,
};
