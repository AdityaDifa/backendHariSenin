import pool from "../config/db.js";

async function getCourses() {
  const result = await pool.query("SELECT * FROM kelas");
  return result[0];
}

async function getCourseById(id) {
  const result = await pool.query(`SELECT * FROM kelas WHERE id_kelas = ${id}`);
  return result[0];
}

async function patchCourse(id_kelas, data) {
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

async function deleteCourse(id_kelas) {
  const result = await pool.query(
    `DELETE FROM kelas WHERE id_kelas = ${id_kelas}`
  );
  return result;
}

async function createCourse(data) {
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

export { getCourses, getCourseById, patchCourse, deleteCourse, createCourse };
