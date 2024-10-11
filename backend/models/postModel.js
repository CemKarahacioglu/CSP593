const { db } = require("../config/db");

const createPostsTable = () => {
  const createPostsTableQuery = `
    CREATE TABLE IF NOT EXISTS posts (
      post_id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      content TEXT NOT NULL,
      image_url VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
    )
  `;
  db.query(createPostsTableQuery, (err) => {
    if (err) {
      console.error("Error creating posts table:", err);
    } else {
      console.log("Posts table created or already exists");
    }
  });
};

module.exports = createPostsTable;
