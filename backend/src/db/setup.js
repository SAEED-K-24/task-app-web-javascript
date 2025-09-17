const { Pool } = require('pg');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();


const pool = new Pool({
    user: process.env.DB_USER ,
  host: process.env.DB_HOST ,
  database: process.env.DB_DATABASE ,
  password: process.env.DB_PASSWORD ,
  port: process.env.DB_PORT ,
});

async function createTables() {
    const createTasksTableQuery = `
    CREATE TABLE IF NOT EXISTS tasks (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title VARCHAR(255) NOT NULL,
        description TEXT,
        completed BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
    `;
    const createUsersTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(50) UNIQUE NOT NULL,
        name VARCHAR(100) NOT NULL,
        password TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
    `;

    try {
        await pool.query('SELECT NOW()'); // Check connection

        await pool.query(createUsersTableQuery);
        await pool.query(createTasksTableQuery);

    } catch (err) {
    } finally {
        // Always end the pool to close the connections
        pool.end();
    }
}

// Call the function to run the setup process
createTables();