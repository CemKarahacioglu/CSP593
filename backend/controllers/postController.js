// postController.js
const { db } = require("../config/db");
const cloudinary = require("cloudinary").v2; // import cloudinary for image upload
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Create a post with optional image upload
const createPost = async (req, res) => {
  const { userId, content } = req.body; // Get user ID and content from request body
  const imageFile = req.file; // Get image file from request

  if (!userId || !content) {
    return res
      .status(400) // Bad Request
      .json({ message: "User ID and content are required" });
  }

  let imageUrl = null; // Initialize imageUrl to null by default
  if (imageFile) {
    // Check if an image file is uploaded
    try {
      // if image file is uploaded, try to upload it to Cloudinary
      const result = await cloudinary.uploader.upload(imageFile.path, {
        folder: "tweet-images",
      });
      imageUrl = result.secure_url; // Get the secure URL of the uploaded image
    } catch (error) {
      console.error("Error uploading image:", error);
      return res.status(500).json({ message: "Image upload failed" });
    }
  }
  // Insert the post into the database
  const query = `INSERT INTO posts (user_id, content, image_url) VALUES (?, ?, ?)`;

  // Execute the query
  db.query(query, [userId, content, imageUrl], (err, result) => {
    if (err) {
      console.error("Error inserting post:", err);
      return res.status(500).json({ message: "Error creating post" });
    }
    res.status(201).json({
      message: "Post created successfully",
      postId: result.insertId,
      imageUrl,
    });
  });
};

// Fetch all posts
const getAllPosts = (req, res) => {
  const query = `
    SELECT posts.post_id, posts.content, posts.image_url, posts.created_at, posts.user_id, users.first_name, users.last_name
    FROM posts
    INNER JOIN users ON posts.user_id = users.user_id
    ORDER BY posts.created_at DESC
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching posts:", err);
      return res.status(500).json({ message: "Error fetching posts" });
    }
    res.status(200).json(results);
  });
};

// Delete a post
const deletePost = (req, res) => {
  const postId = req.params.id;

  const query = "DELETE FROM posts WHERE post_id = ?";
  db.query(query, [postId], (err, result) => {
    if (err) {
      console.error("Error deleting post:", err);
      return res.status(500).json({ message: "Error deleting post" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ message: "Post deleted successfully" });
  });
};

module.exports = { createPost, getAllPosts, deletePost };
