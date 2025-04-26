const mongoose = require("mongoose");

const snapshotSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  emojis: [
    {
      type: String,
      required: true,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: Number,
    default: 0,
  },
  creator: {
    name: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
  },
  // Adding created_by for explicit tracking (points to creator.id)
  created_by: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Snapshot", snapshotSchema);
