const mysql = require("mysql2/promise");
require("dotenv").config();

// Create a pool of connections
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const connectDatabase = async () => {
  try {
    // Test the connection
    const connection = await pool.getConnection();
    console.log(`MySQL connected successfully to ${process.env.DB_HOST}`);
    connection.release();
    return pool;
  } catch (error) {
    console.error("MySQL connection error:", error);
    process.exit(1);
  }
};

module.exports = { connectDatabase, pool };
