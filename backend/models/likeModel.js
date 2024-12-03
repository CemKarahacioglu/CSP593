const { db } = require("../config/db");

// Create the likes table if it does not exist already
const createLikesTable = () => {
  // Query to create the likes table
  const createLikesTableQuery = `
    CREATE TABLE IF NOT EXISTS likes (
      like_id INT AUTO_INCREMENT PRIMARY KEY,
      post_id INT NOT NULL,
      user_id INT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE,
      FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
    )
  `;
  // Execute the query to create the likes table
  db.query(createLikesTableQuery, (err) => {
    if (err) {
      console.error("Error creating likes table:", err);
    } else {
      console.log("Likes table created or already exists");
    }
  });
};

module.exports = createLikesTable;
