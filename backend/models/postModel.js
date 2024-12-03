const { db } = require("../config/db");

// Create the posts table if it does not exist already
const createPostsTable = () => {
  // Query to create the posts table
  const createPostsTableQuery = `
    CREATE TABLE IF NOT EXISTS posts (
      post_id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      content TEXT NOT NULL,
      image_url VARCHAR(255),
      retweeted_post_id INT DEFAULT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
      FOREIGN KEY (retweeted_post_id) REFERENCES posts(post_id) ON DELETE CASCADE
    )
  `;
  // Execute the query to create the posts table
  db.query(createPostsTableQuery, (err) => {
    if (err) {
      console.error("Error creating posts table:", err);
    } else {
      console.log("Posts table created or already exists");
    }
  });
};

module.exports = createPostsTable;
