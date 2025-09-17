const pool = require('../db/db');

async function getAllUsers(){
    const {rows} = await pool.query("SELECT * FROM users");
    return rows;
}

async function getUserById(id){
    const {rows} = await pool.query("SELECT * FROM users WHERE id = $1",[id]);
    return rows[0];
}

async function createUser(email,name,password) {
    const {rows} = await pool.query("INSERT INTO users (email,name,password) VALUES ($1,$2,$3) RETURNING *",[email,name,password]);
    return rows[0];
}

async function updateUser(id,email,name,password) {
    const {rows} = await pool.query("UPDATE users SET email=$1, name=$2, password=$3 WHERE id=$4 RETURNING *",[email,name,password,id]);
    return rows[0];
}

async function deleteUser(id) {
    await pool.query("DELETE FROM users WHERE id=$1",[id]);
}

async function login(email) {
    const {rows} = await pool.query("SELECT * FROM users WHERE email=$1",[email]);
    return rows[0];
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    login
};