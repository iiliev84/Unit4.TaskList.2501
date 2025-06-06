import db from "#db/client";

export async function createUser(username, password) {
    const sql = `
    INSERT INTO users (username, password)
    VALUES ($1, $2)
    RETURNING *
    `;
    const { rows: [user], } = await db.query(sql, [username, password]);
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