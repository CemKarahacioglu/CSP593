// commentController.js
const { db } = require("../config/db");

// Add a Comment to a Post
exports.addComment = (req, res) => {
  const { userId, postId, content } = req.body; // Get user ID, post ID, and content from request body

  if (!userId || !postId || !content) {
    return res
      .status(400) // Bad Request
      .json({ message: "User ID, Post ID, and content are required" });
  }

  const query = `INSERT INTO comments (user_id, post_id, content) VALUES (?, ?, ?)`;
  db.query(query, [userId, postId, content], (err, result) => {
    if (err) {
      console.error("Error adding comment:", err);
      return res.status(500).json({ message: "Error adding comment" });
    }
    res.status(201).json({
      message: "Comment added successfully",
      commentId: result.insertId,
    });
  });
};

// Get All Comments for a Specific Post
exports.getCommentsByPost = (req, res) => {
  const postId = req.params.postId; // Get post ID from URL parameter

  const query = `
    SELECT comments.comment_id, comments.content, comments.created_at, 
           CONCAT(users.first_name, ' ', users.last_name) AS user_name
    FROM comments
    INNER JOIN users ON comments.user_id = users.user_id
    WHERE comments.post_id = ?
    ORDER BY comments.created_at ASC
  `;

  // query to get all comments for a specific post
  db.query(query, [postId], (err, results) => {
    if (err) {
      console.error("Error fetching comments:", err);
      return res.status(500).json({ message: "Error fetching comments" });
    }
    res.status(200).json(results); // OK response with comments
  });
};

// Get Comment Count for a Specific Post
exports.getCommentCount = (req, res) => {
  const postId = req.params.postId;

  const query = `SELECT COUNT(*) AS commentCount FROM comments WHERE post_id = ?`;
  db.query(query, [postId], (err, results) => {
    if (err) {
      console.error("Error fetching comment count:", err);
      return res.status(500).json({ message: "Error fetching comment count" });
    }

    // Return the comment count
    res.status(200).json({ commentCount: results[0].commentCount });
  });
};

// Delete a Comment by ID
exports.deleteComment = (req, res) => {
  const commentId = req.params.commentId;

  const query = `DELETE FROM comments WHERE comment_id = ?`;

  // query to delete a comment by ID
  db.query(query, [commentId], (err, result) => {
    if (err) {
      console.error("Error deleting comment:", err);
      return res.status(500).json({ message: "Error deleting comment" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.status(200).json({ message: "Comment deleted successfully" });
  });
};
