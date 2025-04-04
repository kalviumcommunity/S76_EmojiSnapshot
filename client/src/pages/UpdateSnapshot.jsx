// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateSnapshot = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    creatorName: "",
    emojis: ["", "", "", "", ""],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch the specific snapshot data
    const fetchSnapshot = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/snapshots`);
        const allSnapshots = await response.json();
        const snapshot = allSnapshots.find((s) => s.id === parseInt(id));

        if (!snapshot) {
          throw new Error("Snapshot not found");
        }

        // Fill the form with existing data
        setFormData({
          title: snapshot.title,
          creatorName: snapshot.creator.name,
          emojis: [
            ...snapshot.emojis,
            ...Array(5 - snapshot.emojis.length).fill(""),
          ].slice(0, 5),
        });
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchSnapshot();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEmojiChange = (index, value) => {
    const newEmojis = [...formData.emojis];
    newEmojis[index] = value;
    setFormData({
      ...formData,
      emojis: newEmojis,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Filter out any empty emoji slots
      const filteredEmojis = formData.emojis.filter(
        (emoji) => emoji.trim() !== ""
      );

      if (filteredEmojis.length === 0) {
        throw new Error("Please add at least one emoji");
      }

      const snapshotData = {
        title: formData.title,
        emojis: filteredEmojis,
        creator: { name: formData.creatorName },
      };

      const response = await fetch(
        `http://localhost:5000/api/snapshots/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(snapshotData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update snapshot");
      }

      // Navigate back to home page
      navigate("/emojicard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-yellow-50 flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-yellow-50 py-20 px-6">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Update Emoji Snapshot
        </h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="creatorName">
              Your Name
            </label>
            <input
              type="text"
              id="creatorName"
              name="creatorName"
              value={formData.creatorName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">
              Emojis (Add up to 5)
            </label>
            <div className="grid grid-cols-5 gap-2">
              {formData.emojis.map((emoji, index) => (
                <input
                  key={index}
                  type="text"
                  value={emoji}
                  onChange={(e) => handleEmojiChange(index, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-center text-2xl focus:outline-none focus:ring-2 focus:ring-orange-400"
                  placeholder="😀"
                />
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Tip: Use Windows Key + Period (.) to open emoji picker
            </p>
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => navigate("/emojicard")}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none disabled:opacity-70"
            >
              {loading ? "Updating..." : "Update Snapshot"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateSnapshot;
