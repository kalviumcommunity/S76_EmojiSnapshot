const express = require("express");
const router = express.Router();

// In-memory storage
let items = []; // Temporary in-memory storage
let snapshots = []; // Temporary in-memory storage
let nextId = 5; // Start IDs after sample data

// Middleware to validate item ID
const validateItemId = (req, res, next) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res
      .status(400)
      .json({ message: "Invalid item ID. Must be a number." });
  }
  req.itemId = id; // Store the parsed ID for later use
  next();
};

// Middleware to validate request body
const validateItemBody = (req, res, next) => {
  const { id, name, price } = req.body;
  if (!id || !name || !price) {
    return res
      .status(400)
      .json({ message: "Missing required fields: id, name, price" });
  }
  next();
};

// Create (POST)
router.post("/items", validateItemBody, (req, res) => {
  try {
    const item = req.body;
    if (items.find((i) => i.id === item.id)) {
      return res
        .status(409)
        .json({ message: "Item with this ID already exists" });
    }
    items.push(item);
    res.status(201).json({ message: "Item created", item });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

// Read (GET all)
router.get("/items", (req, res) => {
  try {
    res.json(items);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

// Read (GET one)
router.get("/items/:id", validateItemId, (req, res) => {
  try {
    const item = items.find((i) => i.id === req.itemId);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json(item);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

// Update (PUT)
router.put("/items/:id", validateItemId, (req, res) => {
  try {
    const index = items.findIndex((i) => i.id === req.itemId);
    if (index === -1)
      return res.status(404).json({ message: "Item not found" });

    items[index] = { ...items[index], ...req.body };
    res.json({ message: "Item updated", item: items[index] });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

// Delete (DELETE)
router.delete("/items/:id", validateItemId, (req, res) => {
  try {
    const index = items.findIndex((i) => i.id === req.itemId);
    if (index === -1)
      return res.status(404).json({ message: "Item not found" });

    items.splice(index, 1);
    res.json({ message: "Item deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

// Get all snapshots
router.get("/snapshots", (req, res) => {
  res.json(snapshots);
});

// Initialize with sample data
router.post("/snapshots/init", (req, res) => {
  try {
    // Validate that request body is an array
    if (!Array.isArray(req.body) || req.body.length === 0) {
      return res
        .status(400)
        .json({ message: "Request body must be a non-empty array of snapshots" });
    }

    // Validate each snapshot in the array
    for (const snapshot of req.body) {
      if (!snapshot.title || typeof snapshot.title !== "string") {
        return res.status(400).json({ 
          message: "Each snapshot must have a title property that is a string"
        });
      }
      
      if (!Array.isArray(snapshot.emojis) || snapshot.emojis.length === 0) {
        return res.status(400).json({ 
          message: "Each snapshot must have an emojis property that is a non-empty array"
        });
      }
      
      if (!snapshot.creator || !snapshot.creator.name) {
        return res.status(400).json({ 
          message: "Each snapshot must have a creator with a name property"
        });
      }
    }
    
    snapshots = req.body;
    nextId = Math.max(...snapshots.map((s) => s.id)) + 1;
    res
      .status(201)
      .json({ message: "Snapshots initialized", count: snapshots.length });
  } catch (error) {
    res.status(500).json({ message: "Error initializing snapshots", error: error.message });
  }
});

// Create a new snapshot
router.post("/snapshots", (req, res) => {
  try {
    // Validate request body
    const { title, emojis, creator } = req.body;

    // Check required fields
    if (!title || typeof title !== "string" || title.trim() === "") {
      return res
        .status(400)
        .json({ message: "Title is required and must be a non-empty string" });
    }

    // Validate emojis array
    if (!Array.isArray(emojis) || emojis.length === 0) {
      return res
        .status(400)
        .json({ message: "Emojis must be an array with at least one emoji" });
    }

    // Validate creator
    if (
      !creator ||
      typeof creator !== "object" ||
      !creator.name ||
      typeof creator.name !== "string"
    ) {
      return res
        .status(400)
        .json({ message: "Creator must be an object with a name property" });
    }

    // If validation passed, create the new snapshot
    const newSnapshot = {
      id: nextId++,
      ...req.body,
      createdAt: new Date(),
    };
    snapshots.unshift(newSnapshot); // Add to beginning of array
    res.status(201).json(newSnapshot);
  } catch (error) {
    res.status(500).json({ message: "Error creating snapshot", error: error.message });
  }
});


// Update an existing snapshot with validation
router.put("/snapshots/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const index = snapshots.findIndex((s) => s.id === id);

    if (index === -1) {
      return res.status(404).json({ message: "Snapshot not found" });
    }

    // Validate request body
    const { title, emojis, creator } = req.body;

    // Check required fields
    if (!title || typeof title !== "string" || title.trim() === "") {
      return res
        .status(400)
        .json({ message: "Title is required and must be a non-empty string" });
    }

    // Validate emojis array
    if (!Array.isArray(emojis) || emojis.length === 0) {
      return res
        .status(400)
        .json({ message: "Emojis must be an array with at least one emoji" });
    }

    // Validate creator
    if (
      !creator ||
      typeof creator !== "object" ||
      !creator.name ||
      typeof creator.name !== "string"
    ) {
      return res
        .status(400)
        .json({ message: "Creator must be an object with a name property" });
    }

    // Preserve the id and createdAt, update everything else
    snapshots[index] = {
      ...snapshots[index],
      ...req.body,
      id: snapshots[index].id, // Ensure ID doesn't change
      createdAt: snapshots[index].createdAt, // Keep original creation date
    };

    res.json({ message: "Snapshot updated", snapshot: snapshots[index] });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating snapshot", error: error.message });
  }
});

// Delete a snapshot
router.delete("/snapshots/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const index = snapshots.findIndex((s) => s.id === id);

    if (index === -1) {
      return res.status(404).json({ message: "Snapshot not found" });
    }

    const deleted = snapshots.splice(index, 1)[0];
    res.json({ message: "Snapshot deleted", snapshot: deleted });
  } catch (error) {
    res.status(500).json({ message: "Error deleting snapshot" });
  }
});

module.exports = router;
