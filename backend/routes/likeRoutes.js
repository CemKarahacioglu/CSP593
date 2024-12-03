const express = require("express");
const router = express.Router(); // Create a new router object
const likeController = require("../controllers/likeController");

// Like or unlike a post
router.post("/like", likeController.toggleLike);

// Get the number of likes and user like status for a specific post
router.get("/count/:postId", likeController.getLikeCount);

module.exports = router;
