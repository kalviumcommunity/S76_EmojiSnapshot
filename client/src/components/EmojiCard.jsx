/* eslint-disable react/prop-types */
// src/components/EmojiCard.jsx
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const EmojiCard = ({ snapshot, onDelete }) => {

  const { id, title, emojis, createdAt, likes, creator } = snapshot;
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const navigate = useNavigate();

  const handleLike = () => {
    if (isLiked) {
      setLikeCount((prev) => prev - 1);
    } else {
      setLikeCount((prev) => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleShare = () => {
    // In a real app, this would open a sharing dialog
    alert(`Shared: ${title}`);
  };

  const handleEdit = () => {
    navigate(`/update/${id}`);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this snapshot?")) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/snapshots/${id}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          // Call the onDelete callback to update the UI
          if (onDelete) onDelete(id);
        } else {
          alert("Failed to delete snapshot");
        }
      } catch (error) {
        console.error("Delete error:", error);
        alert("Error deleting snapshot");
      }
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
      {/* Card Header */}
      <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center text-white font-bold">
            {creator.name.charAt(0)}
          </div>
          <span className="font-medium text-gray-700">{creator.name}</span>
        </div>
        <span className="text-xs text-gray-500">
          {new Date(createdAt).toLocaleDateString()}
        </span>
      </div>

      {/* Emoji Canvas/Display */}
      <div className="p-4 bg-gradient-to-br from-indigo-50 to-purple-50 min-h-48 flex items-center justify-center">
        <div className="emoji-canvas p-4 bg-white rounded-lg shadow-sm w-full flex flex-wrap justify-center gap-1">
          {emojis.map((emoji, index) => (
            <span
              key={index}
              className="text-3xl animate-bounce"
              style={{
                animationDelay: `${index * 0.1}s`,
                animationDuration: "2s",
              }}
            >
              {emoji}
            </span>
          ))}
        </div>
      </div>

      {/* Card Footer */}
      <div className="px-4 py-3 bg-white">
        <h3 className="font-semibold text-gray-800 mb-2">{title}</h3>

        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-1">
            <button
              onClick={handleLike}
              className={`p-1.5 rounded-full hover:bg-gray-100 ${
                isLiked ? "text-pink-500" : "text-gray-500"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill={isLiked ? "currentColor" : "none"}
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
            </button>
            <span className="text-sm text-gray-700">{likeCount}</span>
          </div>

          <div className="flex space-x-2">
            {/* Edit button */}
            <button
              onClick={handleEdit}
              className="p-1.5 rounded-full hover:bg-gray-100 text-blue-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
            </button>

            {/* Delete button */}
            <button
              onClick={handleDelete}
              className="p-1.5 rounded-full hover:bg-gray-100 text-red-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </button>

            <button
              onClick={handleShare}
              className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmojiCard;
