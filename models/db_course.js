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
export { getCourses, getCourseById, patchCourse };
