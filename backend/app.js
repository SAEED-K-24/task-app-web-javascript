const express = require('express');
const pool = require('./src/db/db');
const authMiddleware = require('./src/middlewares/authMiddleware');
const app = express();
const port = 3000;

// Middleware
app.use(express.json());
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});



//routes
app.use('/api/v1/tasks',authMiddleware,require('./src/routes/tasks'));
app.use('/api/v1/users',require('./src/routes/users'));




const start = async () => {
  try {
    await pool.connect();
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();