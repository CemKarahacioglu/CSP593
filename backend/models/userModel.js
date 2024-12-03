const { db } = require("../config/db"); // Import the database connection

// Create the users table if it does not exist already
const createUsersTable = () => {
  // Query to create the users table
  const createUsersTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      user_id INT AUTO_INCREMENT PRIMARY KEY,
      first_name VARCHAR(50) NOT NULL,
      last_name VARCHAR(50) NOT NULL,
      email VARCHAR(100) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
  // Execute the query to create the users table
  db.query(createUsersTableQuery, (err) => {
    if (err) {
      console.error("Error creating users table:", err);
    } else {
      console.log("Users table created or already exists");
    }
  });
};

module.exports = createUsersTable;
