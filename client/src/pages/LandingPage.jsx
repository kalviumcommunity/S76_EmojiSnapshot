// eslint-disable-next-line no-unused-vars
import React from "react";
import { motion } from "framer-motion";
// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full bg-yellow-50 text-gray-900 font-sans overflow-x-hidden relative">
      {/* Navbar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full flex justify-between items-center px-8 py-4 bg-yellow-300 shadow-lg fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      >
        <h1 className="text-3xl font-bold cursor-pointer hover:text-orange-600 transition duration-300">
          Emoji Snapshot
        </h1>
        <ul className="flex space-x-8 text-lg font-medium">
          <li>
            <a
              href="#signup"
              className="hover:text-blue-600 hover:scale-110 transition duration-300"
            >
              Sign Up
            </a>
          </li>
          <li>
            <a
              href="#about"
              className="hover:text-blue-600 hover:scale-110 transition duration-300"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#upload"
              className="hover:text-blue-600 hover:scale-110 transition duration-300"
            >
              Upload
            </a>
          </li>
        </ul>
      </motion.nav>

      {/* Hero Section with Background Image */}
      <header
        className="relative flex flex-col items-center justify-center text-center w-full min-h-screen px-6 py-32 max-w-screen"
        style={{
          backgroundImage: "url('/emojiface3.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-30"></div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-3xl"
        >
          <h2 className="text-6xl font-extrabold text-gray-100">
            Discover Your Most Overused Emojis! 🎉
          </h2>
          <p className="mt-6 text-2xl text-gray-200">
            Upload your chats and see which emojis you use the most in a fun and
            interactive way.
          </p>
          <Link to="/emojicard">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 px-12 py-4 bg-orange-500 text-white text-xl font-semibold rounded-full shadow-lg hover:bg-orange-600 transition-all duration-300"
            >
              Get Started 🚀
            </motion.button>
          </Link>
        </motion.div>
      </header>

      {/* About Section with Emoji Stickers */}
      <motion.section
        id="about"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative flex flex-col items-center justify-center py-40 w-full bg-gray-100 min-h-screen max-w-screen animate-fadeIn overflow-hidden"
      >
        <img
          src="/emojis/laughing.png"
          alt="Laughing Emoji"
          className="absolute top-10 left-10 w-16 "
        />
        <img
          src="/emojis/heart.png"
          alt="Heart Emoji"
          className="absolute bottom-10 left-1/18 w-16 "
        />
        <img
          src="/emojis/party.png"
          alt="Party Popper"
          className="absolute top-15 right-10 w-16 "
        />
        <img
          src="/emojis/thinking.png"
          alt="Thinking Emoji"
          className="absolute bottom-10 right-1/18 w-16 "
        />
        <img
          src="/emojis/message.png"
          alt="Message Emoji"
          className="absolute bottom-15 left-1/2 w-16 "
        />
        <img
          src="/emojis/cool.png"
          alt="Cool Emoji"
          className="absolute top-15 left-1/2 w-16 "
        />

        <h2 className="text-5xl font-bold text-blue-800 mb-8">
          About Emoji Snapshot
        </h2>
        <p className="text-xl text-black-600 max-w-4xl text-center leading-relaxed">
          Ever wondered which emojis you use the most?{" "}
          <span className="font-semibold">Emoji Snapshot</span> is a fun tool
          that analyzes your chat history to show your most frequently used
          emojis. Whether you&lsquo;re a 😂 addict or ❤️ lover, our tool helps
          you visualize your emoji habits!
        </p>
        <p className="mt-6 text-lg text-black-500 max-w-3xl text-center leading-relaxed">
          We built this tool to make chat analysis engaging and fun. With a
          sleek UI and cool effects, you can dive into your emoji world like
          never before!
        </p>
      </motion.section>

      {/* Upload Section */}
      <motion.section
        id="upload"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center justify-center py-40 w-full bg-white shadow-lg rounded-lg min-h-screen max-w-screen-xl"
      >
        <h2 className="text-4xl font-bold">Upload Your Chats</h2>
        <p className="text-xl text-gray-700 mt-4">
          Select a chat file to analyze your emoji usage.
        </p>
        <input
          type="file"
          accept=".txt,.json"
          className="mt-6 p-4 border border-gray-400 rounded-lg w-96 shadow-md text-lg cursor-pointer hover:border-gray-600 transition duration-300"
        />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 px-8 py-3 bg-green-500 text-white text-xl font-semibold rounded-full shadow-lg hover:bg-green-600 transition-all duration-300"
        >
          Analyze 🔍
        </motion.button>
      </motion.section>

      {/* Footer */}
      <footer className="w-full text-center py-5 bg-yellow-300 text-gray-800 shadow-lg mt-32 flex items-center justify-center max-w-screen animate-slideIn">
        <p className="text-lg font-medium">
          &copy;2025 Emoji Snapshot. Have fun analyzing your chats! 🎉
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
