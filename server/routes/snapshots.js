const express = require("express");
const router = express.Router();
const {
  getAllSnapshots,
  createSnapshot,
  getSnapshotById,
  updateSnapshot,
  deleteSnapshot,
} = require("../models/SnapshotSQL");

// Get all snapshots
router.get("/snapshots", async (req, res) => {
  try {
    const snapshots = await getAllSnapshots();
    res.json(snapshots);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single snapshot by ID
router.get("/snapshots/:id", async (req, res) => {
  try {
    const snapshot = await getSnapshotById(req.params.id);
    if (!snapshot) {
      return res.status(404).json({ message: "Snapshot not found" });
    }
    res.json(snapshot);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a snapshot
router.post("/snapshots", async (req, res) => {
  try {
    const newSnapshot = await createSnapshot(req.body);
    res.status(201).json(newSnapshot);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a snapshot
router.put("/snapshots/:id", async (req, res) => {
  try {
    const updatedSnapshot = await updateSnapshot(req.params.id, req.body);
    if (!updatedSnapshot) {
      return res.status(404).json({ message: "Snapshot not found" });
    }
    res.json(updatedSnapshot);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a snapshot
router.delete("/snapshots/:id", async (req, res) => {
  try {
    const deletedSnapshot = await deleteSnapshot(req.params.id);
    if (!deletedSnapshot) {
      return res.status(404).json({ message: "Snapshot not found" });
    }
    res.json({ message: "Snapshot deleted", snapshot: deletedSnapshot });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
