const express = require("express");
const router = express.Router();
const Snapshot = require("../models/Snapshot");

// Get all snapshots
router.get("/snapshots", async (req, res) => {
  try {
    const snapshots = await Snapshot.find().sort({ createdAt: -1 });
    res.json(snapshots);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a snapshot
router.post("/snapshots", async (req, res) => {
  const snapshot = new Snapshot(req.body);
  try {
    const newSnapshot = await snapshot.save();
    res.status(201).json(newSnapshot);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
