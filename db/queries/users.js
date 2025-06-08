import db from "#db/client";
import bcrypt from "bcrypt";

export async function createUser(username, password) {
    const sql = `
    INSERT INTO users (username, password)
    VALUES ($1, $2)
    RETURNING *
    `;
    const hashedPassword = await bcrypt.hash(password, 5);
    const {rows: [user],} = await db.query(sql, [username, hashedPassword]);
    return user;
}

export async function getUsers(){
    const sql = `
    SELECT *
    FROM users
    `;
    const {rows: users} = await db.query(sql);
    return users;
}

export async function getUserById(id) {
  const sql = `
  SELECT *
  FROM users
  WHERE id = $1
  `;
  const {rows: [user],} = await db.query(sql, [id]);
  return user;
}