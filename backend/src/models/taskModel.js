const pool = require('../db/db');

async function getAllTasks(userId){
    const {rows} = await pool.query("SELECT * FROM tasks WHERE user_id = $1",[userId]);
    return rows;
}

async function getTaskById(id,userId){
    const {rows} = await pool.query("SELECT * FROM tasks WHERE id = $1 AND user_id = $2",
  [id, userId]);
    return rows[0];
}

async function createTask(title, description,userId){
    const {rows} = await pool.query("INSERT INTO tasks (title,description,user_id) VALUES ($1,$2,$3) RETURNING *",
        [title,description,userId]);
    return rows[0];
}

async function updateTask(id,userId ,title, description, completed){
    const {rows} = await pool.query("UPDATE tasks SET title=$1, description=$2, completed=$3 WHERE id=$4 AND user_id = $5 RETURNING *",
        [title,description,completed,id,userId]);
    return rows[0];
}

async function deleteTask(id,userId){
    await pool.query("DELETE FROM tasks WHERE id=$1 AND user_id = $2",[id,userId]);
}

module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
};