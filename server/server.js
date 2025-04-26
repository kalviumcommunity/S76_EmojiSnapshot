const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const { connectDatabase } = require("./database");

const snapshotRoutes = require("./routes/snapshots");
const routes = require("./routes"); // Keep this for backward compatibility

app.use(cors());
app.use(express.json());
app.use("/api", snapshotRoutes);
app.use("/api", routes); // Keep this for backward compatibility

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
    res.json({
      message: "Welcome to Emoji Snapshot API",
      databaseStatus: "Connected to MySQL",
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
