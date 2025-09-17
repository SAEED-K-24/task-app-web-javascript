const pool = require('../db/db');

async function getAllTasks(){
    console.log('getAllTasks called in model');
    const {rows} = await pool.query("SELECT * FROM tasks");
    return rows;
}

async function getTaskById(id){
    const {rows} = await pool.query("SELECT * FROM tasks WHERE id = $1",[id]);
    return rows[0];
}

async function createTask(title, description){
    const {rows} = await pool.query("INSERT INTO tasks (title,description) VALUES ($1,$2) RETURNING *",[title,description]);
    return rows[0];
}

async function updateTask(id, title, description, completed){
    const {rows} = await pool.query("UPDATE tasks SET title=$1, description=$2, completed=$3 WHERE id=$4 RETURNING *",[title,description,completed,id]);
    return rows[0];
}

async function deleteTask(id){
    console.log('deleteTask called in model');
    await pool.query("DELETE FROM tasks WHERE id=$1",[id]);
    console.log('Task deleted');
    
}

module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
};