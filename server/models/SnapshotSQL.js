const { pool } = require("../database");

// Get all snapshots
const getAllSnapshots = async () => {
  try {
    const [snapshots] = await pool.query(`
      SELECT s.id, s.title, s.created_at as createdAt, s.likes, s.created_by
      FROM snapshots s
      ORDER BY s.created_at DESC
    `);

    // Fetch emojis for each snapshot
    for (const snapshot of snapshots) {
      const [emojis] = await pool.query(
        "SELECT emoji FROM snapshot_emojis WHERE snapshot_id = ?",
        [snapshot.id]
      );

      const [creator] = await pool.query(
        "SELECT id, name FROM creators WHERE id = ?",
        [snapshot.created_by]
      );

      snapshot.emojis = emojis.map((e) => e.emoji);
      snapshot.creator = creator[0] || {
        id: snapshot.created_by,
        name: "Unknown",
      };
    }

    return snapshots;
  } catch (error) {
    throw error;
  }
};

// Create a snapshot
const createSnapshot = async (snapshotData) => {
  const { title, emojis, creator, created_by } = snapshotData;

  try {
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    try {
      // Insert or update creator
      await connection.query(
        "INSERT INTO creators (id, name) VALUES (?, ?) ON DUPLICATE KEY UPDATE name = ?",
        [creator.id, creator.name, creator.name]
      );

      // Insert snapshot
      const [result] = await connection.query(
        "INSERT INTO snapshots (title, created_by) VALUES (?, ?)",
        [title, created_by || creator.id]
      );

      const snapshotId = result.insertId;

      // Insert emojis
      for (const emoji of emojis) {
        await connection.query(
          "INSERT INTO snapshot_emojis (snapshot_id, emoji) VALUES (?, ?)",
          [snapshotId, emoji]
        );
      }

      await connection.commit();
      connection.release();

      // Get the created snapshot
      return getSnapshotById(snapshotId);
    } catch (error) {
      await connection.rollback();
      connection.release();
      throw error;
    }
  } catch (error) {
    throw error;
  }
};

// Get a snapshot by ID
const getSnapshotById = async (id) => {
  try {
    const [snapshots] = await pool.query(
      `
      SELECT s.id, s.title, s.created_at as createdAt, s.likes, s.created_by
      FROM snapshots s
      WHERE s.id = ?
    `,
      [id]
    );

    if (snapshots.length === 0) {
      return null;
    }

    const snapshot = snapshots[0];

    // Fetch emojis
    const [emojis] = await pool.query(
      "SELECT emoji FROM snapshot_emojis WHERE snapshot_id = ?",
      [id]
    );

    // Fetch creator
    const [creators] = await pool.query(
      "SELECT id, name FROM creators WHERE id = ?",
      [snapshot.created_by]
    );

    snapshot.emojis = emojis.map((e) => e.emoji);
    snapshot.creator = creators[0] || {
      id: snapshot.created_by,
      name: "Unknown",
    };

    return snapshot;
  } catch (error) {
    throw error;
  }
};

// Update a snapshot
const updateSnapshot = async (id, snapshotData) => {
  const { title, emojis, creator } = snapshotData;

  try {
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    try {
      // Update creator if necessary
      if (creator && creator.name) {
        await connection.query("UPDATE creators SET name = ? WHERE id = ?", [
          creator.name,
          creator.id,
        ]);
      }

      // Update snapshot
      await connection.query("UPDATE snapshots SET title = ? WHERE id = ?", [
        title,
        id,
      ]);

      // Delete existing emojis
      await connection.query(
        "DELETE FROM snapshot_emojis WHERE snapshot_id = ?",
        [id]
      );

      // Insert new emojis
      for (const emoji of emojis) {
        await connection.query(
          "INSERT INTO snapshot_emojis (snapshot_id, emoji) VALUES (?, ?)",
          [id, emoji]
        );
      }

      await connection.commit();
      connection.release();

      // Get the updated snapshot
      return getSnapshotById(id);
    } catch (error) {
      await connection.rollback();
      connection.release();
      throw error;
    }
  } catch (error) {
    throw error;
  }
};

// Delete a snapshot
const deleteSnapshot = async (id) => {
  try {
    const snapshot = await getSnapshotById(id);
    if (!snapshot) {
      return null;
    }

    // Delete the snapshot (cascade will delete related emojis)
    await pool.query("DELETE FROM snapshots WHERE id = ?", [id]);

    return snapshot;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllSnapshots,
  createSnapshot,
  getSnapshotById,
  updateSnapshot,
  deleteSnapshot,
};
