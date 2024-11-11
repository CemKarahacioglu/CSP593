// commentRoutes.js
const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");

// Add a Comment to a Post
router.post("/add", commentController.addComment);

// Get All Comments for a Specific Post
router.get("/post/:postId", commentController.getCommentsByPost);

// Get Comment Count for a Specific Post
router.get("/count/:postId", commentController.getCommentCount);

// Delete a Comment by ID
router.delete("/:commentId", commentController.deleteComment);

module.exports = router;
