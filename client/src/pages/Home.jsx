// src/pages/Home.jsx
// eslint-disable-next-line no-unused-vars
import React from "react";
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
  return (
    <div className="min-h-screen bg-yellow-50 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
          Trending Emoji Snapshots
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleSnapshots.map((snapshot) => (
            <EmojiCard key={snapshot.id} snapshot={snapshot} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
