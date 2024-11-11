const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { initializeDatabase } = require("./config/db"); // Import database initialization

dotenv.config(); // Load .env file

const app = express();
app.use(express.json());
app.use(cors());

// Import routes
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

// Use routes
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/likes", likeRoutes);
app.use("/comments", commentRoutes);
app.use("/retweets", retweetRoutes);

// Start the server
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
