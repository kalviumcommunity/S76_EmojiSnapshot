const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const connectDatabase = require("./database");

const routes = require('./routes');
app.use(cors());
app.use(express.json());
app.use('/api', routes);


connectDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to start server:", error);
    process.exit(1);
  });

app.get("/", async (req, res) => {
  try {
    const dbStatus =
      mongoose.connection.readyState === 1 ? "Connected" : "Disconnected";
    res.json({
      message: "Welcome to ASAP API",
      databaseStatus: dbStatus,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error checking database status",
      error: error.message,
    });
  }
});

app.get("/ping", function (req, res) {
  res.send("pong");
});

module.exports = app;