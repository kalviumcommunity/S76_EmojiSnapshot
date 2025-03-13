/* eslint-disable react/prop-types */
// src/components/EmojiCard.jsx
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';

const EmojiCard = ({ snapshot }) => {
  // eslint-disable-next-line no-unused-vars
  const { id, title, emojis, createdAt, likes, creator } = snapshot;
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);

  const handleLike = () => {
    if (isLiked) {
      setLikeCount(prev => prev - 1);
    } else {
      setLikeCount(prev => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleShare = () => {
    // In a real app, this would open a sharing dialog
    alert(`Shared: ${title}`);
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
                animationDuration: '2s' 
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
              className={`p-1.5 rounded-full hover:bg-gray-100 ${isLiked ? 'text-pink-500' : 'text-gray-500'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill={isLiked ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            </button>
            <span className="text-sm text-gray-700">{likeCount}</span>
          </div>

          <div className="flex space-x-2">
            <button 
              onClick={handleShare}
              className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
              </svg>
            </button>
            <button className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmojiCard;