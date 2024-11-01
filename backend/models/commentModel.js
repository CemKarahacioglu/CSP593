const { db } = require("../config/db");

const createCommentsTable = () => {
  const createCommentsTableQuery = `
    CREATE TABLE IF NOT EXISTS comments (
      comment_id INT AUTO_INCREMENT PRIMARY KEY,
      post_id INT NOT NULL,
      user_id INT NOT NULL,
      content TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE,
      FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
    )
  `;

  db.query(createCommentsTableQuery, (err) => {
    if (err) {
      console.error("Error creating comments table:", err);
    } else {
      console.log("Comments table created or already exists");
    }
  });
};

module.exports = createCommentsTable;
