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
  },
});

module.exports = mongoose.model("Snapshot", snapshotSchema);
