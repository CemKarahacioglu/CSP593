// likeController.js
const { db } = require("../config/db");

exports.toggleLike = async (req, res) => {
  const { userId, postId } = req.body; // Get user ID and post ID from request body
  try {
    // Try to handle the like/unlike operation
    const [existingLike] = await db
      .promise() // Use promise mode
      .query("SELECT * FROM likes WHERE user_id = ? AND post_id = ?", [
        userId,
        postId,
      ]);

    let liked; // Variable to store whether the post is liked or not
    if (existingLike.length > 0) {
      // Unlike if it exists
      await db // await the query execution
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
    const [[likeCountResult]] = await db
      .promise()
      .query("SELECT COUNT(*) AS likeCount FROM likes WHERE post_id = ?", [
        postId,
      ]);

    const likeCount = likeCountResult.likeCount;
    res.status(200).json({ message: "Like updated", liked, likeCount });
  } catch (error) {
    console.error("Error handling like/unlike:", error);
    res.status(500).json({ message: "An error occurred." });
  }
};

exports.getLikeCount = async (req, res) => {
  const postId = req.params.postId; // Get post ID from URL parameter
  const userId = req.query.userId; // Pass userId as a query parameter

  try {
    // Try to fetch the like count
    const [[likeCountResult]] = await db
      .promise()
      .query("SELECT COUNT(*) AS likeCount FROM likes WHERE post_id = ?", [
        postId,
      ]);

    let userLiked = false; // Set userLiked to false by default

    // Check if the user has liked the post
    if (userId) {
      const [userLikeResult] = await db
        .promise()
        .query("SELECT * FROM likes WHERE post_id = ? AND user_id = ?", [
          postId,
          userId,
        ]);
      userLiked = userLikeResult.length > 0; // Set userLiked to true if the user has liked the post
    }

    const likeCount = likeCountResult.likeCount; // Get the like count
    res.status(200).json({ likeCount, userLiked }); // Return the like count and userLiked status
  } catch (error) {
    console.error("Error fetching like count:", error);
    res.status(500).json({ message: "Error fetching like count" });
  }
};
