// likeRoutes.js
const express = require("express");
const { db } = require("../config/db");
const router = express.Router();

// Like or unlike a post
router.post("/like", async (req, res) => {
  const { userId, postId } = req.body;
  try {
    const [existingLike] = await db
      .promise()
      .query("SELECT * FROM likes WHERE user_id = ? AND post_id = ?", [
        userId,
        postId,
      ]);

    let liked;
    if (existingLike.length > 0) {
      // Unlike if it exists
      await db
        .promise()
        .query("DELETE FROM likes WHERE user_id = ? AND post_id = ?", [
          userId,
          postId,
        ]);
      liked = false;
    } else {
      // Otherwise, like the post
      await db
        .promise()
        .query(
          "INSERT INTO likes (user_id, post_id, created_at) VALUES (?, ?, NOW())",
          [userId, postId]
        );
      liked = true;
    }

    // Retrieve the updated like count
    const [likeCountResult] = await db
      .promise()
      .query("SELECT COUNT(*) AS likeCount FROM likes WHERE post_id = ?", [
        postId,
      ]);

    const likeCount = likeCountResult[0].likeCount;
    res.status(200).json({ message: "Like updated", liked, likeCount });
  } catch (error) {
    console.error("Error handling like/unlike:", error);
    res.status(500).json({ message: "An error occurred." });
  }
});

// Get the number of likes and user like status for a specific post
router.get("/count/:postId", async (req, res) => {
  const postId = req.params.postId;
  const userId = req.query.userId; // Pass userId as a query parameter

  try {
    const [[likeCountResult]] = await db
      .promise()
      .query("SELECT COUNT(*) AS likeCount FROM likes WHERE post_id = ?", [
        postId,
      ]);

    let userLiked = false;

    // Check if the user has liked the post
    if (userId) {
      const [userLikeResult] = await db
        .promise()
        .query("SELECT * FROM likes WHERE post_id = ? AND user_id = ?", [
          postId,
          userId,
        ]);
      userLiked = userLikeResult.length > 0;
    }

    const likeCount = likeCountResult.likeCount;
    res.status(200).json({ likeCount, userLiked });
  } catch (error) {
    console.error("Error fetching like count:", error);
    res.status(500).json({ message: "Error fetching like count" });
  }
});

module.exports = router;
