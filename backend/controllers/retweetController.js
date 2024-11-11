const { db } = require("../config/db");

// Add a Retweet by creating a new post entry with retweeted_post_id and original content
exports.addRetweet = (req, res) => {
  const { userId, postId } = req.body;

  const getOriginalPostQuery = `
    SELECT posts.content, posts.image_url, users.user_id, users.first_name, users.last_name
    FROM posts
    JOIN users ON posts.user_id = users.user_id
    WHERE posts.post_id = ?
  `;

  db.query(getOriginalPostQuery, [postId], (err, results) => {
    if (err) {
      console.error("Error fetching original post:", err);
      return res.status(500).json({ message: "Error fetching original post" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Original post not found" });
    }

    const originalContent = results[0].content;
    const originalImageUrl = results[0].image_url;

    const query = `INSERT INTO posts (user_id, retweeted_post_id, content, image_url) VALUES (?, ?, ?, ?)`;
    db.query(
      query,
      [userId, postId, originalContent, originalImageUrl],
      (err, result) => {
        if (err) {
          console.error("Error retweeting post:", err);
          return res.status(500).json({ message: "Error retweeting post" });
        }
        res.status(201).json({
          message: "Post retweeted successfully",
          retweetId: result.insertId,
          originalContent,
          originalImageUrl,
        });
      }
    );
  });
};

// Fetch posts with retweet details, identifying original authors
exports.getPostsWithRetweets = (req, res) => {
  const query = `
    SELECT 
      p1.post_id, p1.user_id AS retweeter_id, p1.content, p1.image_url, p1.retweeted_post_id, p1.created_at,
      u1.first_name AS retweeter_first_name, u1.last_name AS retweeter_last_name,
      IF(p1.retweeted_post_id IS NOT NULL, p2.content, p1.content) AS final_content,
      IF(p1.retweeted_post_id IS NOT NULL, p2.image_url, p1.image_url) AS final_image_url,
      IF(p1.retweeted_post_id IS NOT NULL, p2.user_id, p1.user_id) AS original_author_id,
      IF(p1.retweeted_post_id IS NOT NULL, CONCAT(u2.first_name, ' ', u2.last_name), CONCAT(u1.first_name, ' ', u1.last_name)) AS original_author_name
    FROM posts p1
    LEFT JOIN posts p2 ON p1.retweeted_post_id = p2.post_id
    LEFT JOIN users u1 ON p1.user_id = u1.user_id
    LEFT JOIN users u2 ON p2.user_id = u2.user_id
    ORDER BY p1.created_at DESC
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching posts with retweets:", err);
      return res.status(500).json({ message: "Error fetching posts" });
    }
    res.status(200).json(results);
  });
};
