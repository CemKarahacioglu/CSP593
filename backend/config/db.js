const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 3306, // Optional
});

const initializeDatabase = (callback) => {
  // Connect to MySQL server
  db.connect((err) => {
    if (err) {
      console.error("Error connecting to MySQL server:", err);
      return;
    }
    console.log("Connected to MySQL server");

    // Create the database if it doesn't exist
    db.query(
      `CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\``,
      (err) => {
        if (err) {
          console.error("Error creating database:", err);
          return;
        }
        console.log(`Database ${process.env.DB_NAME} created or exists`);

        // Switch to the created database
        db.changeUser({ database: process.env.DB_NAME }, (err) => {
          if (err) {
            console.error("Error switching to the database:", err);
            return;
          }
          console.log(`Using database ${process.env.DB_NAME}`);

          // Callback to create tables after database is selected
          callback();
        });
      }
    );
  });
};

module.exports = { db, initializeDatabase };
