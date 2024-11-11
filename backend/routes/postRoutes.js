// postRoutes.js
const express = require("express");
const multer = require("multer");
const {
  createPost,
  getAllPosts,
  deletePost,
} = require("../controllers/postController");

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // Multer configuration for handling image uploads

// Route for creating a post with optional image
router.post("/create-post", upload.single("image"), createPost);

// Route to get all posts
router.get("/", getAllPosts);

// Route to delete a post
router.delete("/:id", deletePost);

module.exports = router;
