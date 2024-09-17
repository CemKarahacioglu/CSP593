const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(express.json());

app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Tarcin314159265!",
  database: "user_authv2",
});

// Backend API Routes

// Register User Route
app.post("/signup", (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Insert user into the database
  const query = `INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)`;

  db.query(query, [firstName, lastName, email, password], (err, result) => {
    if (err) {
      console.log("Error inserting user:", err);
      return res.status(500).json({ message: "Error registering user" });
    }
    res.status(201).json({ message: "User registered successfully" });
  });
});

// Login User Route
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Check if user exists in the database
  const query = `SELECT first_name, last_name, email FROM users WHERE email = ? AND password = ?`;

  db.query(query, [email, password], (err, results) => {
    if (err) {
      console.log("Error during login:", err);
      return res.status(500).json({ message: "Error logging in" });
    }

    if (results.length > 0) {
      const user = results[0]; // Extract the user's data from the query result
      res.status(200).json({
        name: `${user.first_name} ${user.last_name}`, // Send the user's full name
        email: user.email, // Send the user's email
      });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  });
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

// Start the server
const PORT = 8081;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
