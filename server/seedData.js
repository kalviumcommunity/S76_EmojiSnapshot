const { pool } = require("./database");
const { connectDatabase } = require("./database");

const sampleData = [
  {
    title: "My Most Used Emojis!",
    emojis: ["😂", "🔥", "❤️", "😎", "🙌"],
    creator: { name: "John Doe", id: "john-doe" },
  },
  {
    title: "Gaming Session Vibes",
    emojis: ["🎮", "😤", "🏆", "👾", "💪"],
    creator: { name: "Jane Smith", id: "jane-smith" },
  },
  {
    title: "Food Lover's Emojis",
    emojis: ["🍕", "🍜", "🍣", "🍪", "☕"],
    creator: { name: "Mike Wilson", id: "mike-wilson" },
  },
  {
    title: "Weekend Mood",
    emojis: ["🎉", "🎸", "🌞", "🏖️", "🍹"],
    creator: { name: "Sarah Lee", id: "sarah-lee" },
  },
];

const seedDatabase = async () => {
  try {
    await connectDatabase();

    // Insert creators
    for (const snapshot of sampleData) {
      const { creator } = snapshot;
      await pool.query("INSERT IGNORE INTO creators (id, name) VALUES (?, ?)", [
        creator.id,
        creator.name,
      ]);
    }

    // Insert snapshots and emojis
    for (const snapshot of sampleData) {
      const { title, emojis, creator } = snapshot;

      // Insert snapshot
      const [result] = await pool.query(
        "INSERT INTO snapshots (title, created_by) VALUES (?, ?)",
        [title, creator.id]
      );

      const snapshotId = result.insertId;

      // Insert emojis
      for (const emoji of emojis) {
        await pool.query(
          "INSERT INTO snapshot_emojis (snapshot_id, emoji) VALUES (?, ?)",
          [snapshotId, emoji]
        );
      }
    }

    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
