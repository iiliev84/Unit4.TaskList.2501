import db from "#db/client";

export async function createTask(title, done, user_id) {
    const sql = `
    INSERT INTO tasks (title, done, user_id)
    VALUES ($1, $2, $3)
    RETURNING *
    `;
    const { rows: [task], } = await db.query(sql, [title, done, user_id]);
    return task;
}

export async function getTasks(){
    const sql = `
    SELECT *
    FROM tasks
    `;
    const {rows: tasks} = await db.query(sql);
    return tasks;
}