const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { initializeDatabase } = require("./config/db"); // Import database initialization

dotenv.config(); // Load .env file

const app = express(); // Create an Express app instance
app.use(express.json()); // Parse JSON bodies in requests to req.body
app.use(cors()); // cors middleware to allow cross-origin requests

// Import routes for users, posts, likes, comments, and retweets
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const likeRoutes = require("./routes/likeRoutes");
const commentRoutes = require("./routes/commentRoutes");
const retweetRoutes = require("./routes/retweetRoutes");

// Initialize tables after the database is created and selected
initializeDatabase(() => {
  const createUsersTable = require("./models/userModel");
  const createPostsTable = require("./models/postModel");
  const createLikesTable = require("./models/likeModel");
  const createCommentsTable = require("./models/commentModel");

  createUsersTable();
  createPostsTable();
  createLikesTable();
  createCommentsTable();
});

// Use routes for users, posts, likes, comments, and retweets
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/likes", likeRoutes);
app.use("/comments", commentRoutes);
app.use("/retweets", retweetRoutes);

// Start the server on port 8081
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
