/* eslint-disable no-unused-vars */
// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom"; // Add useLocation
import EmojiCard from "../components/EmojiCard";

const sampleSnapshots = [
  {
    id: 1,
    title: "My Most Used Emojis!",
    emojis: ["😂", "🔥", "❤️", "😎", "🙌"],
    createdAt: new Date(),
    likes: 12,
    creator: { name: "John Doe" },
  },
  {
    id: 2,
    title: "Gaming Session Vibes",
    emojis: ["🎮", "😤", "🏆", "👾", "💪"],
    createdAt: new Date(),
    likes: 8,
    creator: { name: "Jane Smith" },
  },
  {
    id: 3,
    title: "Food Lover's Emojis",
    emojis: ["🍕", "🍜", "🍣", "🍪", "☕"],
    createdAt: new Date(),
    likes: 15,
    creator: { name: "Mike Wilson" },
  },
  {
    id: 4,
    title: "Weekend Mood",
    emojis: ["🎉", "🎸", "🌞", "🏖️", "🍹"],
    createdAt: new Date(),
    likes: 20,
    creator: { name: "Sarah Lee" },
  },
];

const Home = () => {
  const [snapshots, setSnapshots] = useState(sampleSnapshots);
  const [loading, setLoading] = useState(true);
  const location = useLocation(); // Add this hook

  useEffect(() => {
    // Function to initialize backend
    const initializeBackend = async () => {
      try {
        // First check if there are any snapshots
        const checkResponse = await fetch(
          "http://localhost:5000/api/snapshots"
        );
        const existingSnapshots = await checkResponse.json();

        // Only initialize if there are no snapshots
        if (existingSnapshots.length === 0) {
          await fetch("http://localhost:5000/api/snapshots/init", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(sampleSnapshots),
          });
        }
      } catch (error) {
        console.error("Error initializing backend:", error);
      }
    };

    // Function to fetch snapshots
    const fetchSnapshots = async () => {
      try {
        console.log("Fetching snapshots...");
        const response = await fetch("http://localhost:5000/api/snapshots");
        if (response.ok) {
          const data = await response.json();
          console.log("Fetched data:", data);
          setSnapshots(data.length > 0 ? data : sampleSnapshots);
        }
      } catch (error) {
        console.error("Error fetching snapshots:", error);
        setSnapshots(sampleSnapshots); // Fallback to sample data
      } finally {
        setLoading(false);
      }
    };

    // Run both functions
    initializeBackend().then(() => fetchSnapshots());
  }, [location.key]); // Add location.key as dependency to refetch when location changes

  const handleDelete = (id) => {
    // Update state to remove deleted snapshot
    setSnapshots(snapshots.filter((snapshot) => snapshot.id !== id));
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
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            Trending Emoji Snapshots
          </h1>
          <Link to="/create">
            <button className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none">
              Create New
            </button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {snapshots.map((snapshot) => (
            <EmojiCard
              key={snapshot.id}
              snapshot={snapshot}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
