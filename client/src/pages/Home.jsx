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
    creator: { name: "John Doe", id: "john-doe" },
    created_by: "john-doe",
  },
  {
    id: 2,
    title: "Gaming Session Vibes",
    emojis: ["🎮", "😤", "🏆", "👾", "💪"],
    createdAt: new Date(),
    likes: 8,
    creator: { name: "Jane Smith", id: "jane-smith" },
    created_by: "jane-smith",
  },
  {
    id: 3,
    title: "Food Lover's Emojis",
    emojis: ["🍕", "🍜", "🍣", "🍪", "☕"],
    createdAt: new Date(),
    likes: 15,
    creator: { name: "Mike Wilson", id: "mike-wilson" },
    created_by: "mike-wilson",
  },
  {
    id: 4,
    title: "Weekend Mood",
    emojis: ["🎉", "🎸", "🌞", "🏖️", "🍹"],
    createdAt: new Date(),
    likes: 20,
    creator: { name: "Sarah Lee", id: "sarah-lee" },
    created_by: "sarah-lee",
  },
];

const Home = () => {
  const [snapshots, setSnapshots] = useState(sampleSnapshots);
  const [allSnapshots, setAllSnapshots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCreator, setSelectedCreator] = useState("all");
  const [creators, setCreators] = useState([]);
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
          const snapshotsData = data.length > 0 ? data : sampleSnapshots;

          // Extract unique creators
          const uniqueCreators = [
            ...new Set(snapshotsData.map((snapshot) => snapshot.creator.name)),
          ].map((name) => {
            const snapshot = snapshotsData.find((s) => s.creator.name === name);
            return {
              name,
              id:
                snapshot.creator.id || name.toLowerCase().replace(/\s+/g, "-"),
            };
          });

          setCreators(uniqueCreators);
          setAllSnapshots(snapshotsData);
          setSnapshots(snapshotsData);
        }
      } catch (error) {
        console.error("Error fetching snapshots:", error);

        // Extract unique creators from sample data
        const uniqueCreators = [
          ...new Set(sampleSnapshots.map((snapshot) => snapshot.creator.name)),
        ].map((name) => {
          const snapshot = sampleSnapshots.find((s) => s.creator.name === name);
          return {
            name,
            id: snapshot.creator.id || name.toLowerCase().replace(/\s+/g, "-"),
          };
        });

        setCreators(uniqueCreators);
        setAllSnapshots(sampleSnapshots);
        setSnapshots(sampleSnapshots); // Fallback to sample data
      } finally {
        setLoading(false);
      }
    };

    // Run both functions
    initializeBackend().then(() => fetchSnapshots());
  }, [location.key]); // Add location.key as dependency to refetch when location changes

  const handleDelete = (id) => {
    // Update both states to remove deleted snapshot
    setSnapshots(snapshots.filter((snapshot) => snapshot.id !== id));
    setAllSnapshots(allSnapshots.filter((snapshot) => snapshot.id !== id));
  };

  const handleCreatorChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedCreator(selectedValue);

    if (selectedValue === "all") {
      setSnapshots(allSnapshots);
    } else {
      setSnapshots(
        allSnapshots.filter(
          (snapshot) =>
            snapshot.creator.id === selectedValue ||
            snapshot.created_by === selectedValue
        )
      );
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
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            Trending Emoji Snapshots
          </h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <label
                htmlFor="creator-filter"
                className="mr-2 text-gray-700 font-medium"
              >
                Filter by Creator:
              </label>
              <select
                id="creator-filter"
                value={selectedCreator}
                onChange={handleCreatorChange}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                <option value="all">All Users</option>
                {creators.map((creator) => (
                  <option key={creator.id} value={creator.id}>
                    {creator.name}
                  </option>
                ))}
              </select>
            </div>
            <Link to="/create">
              <button className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none">
                Create New
              </button>
            </Link>
          </div>
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
