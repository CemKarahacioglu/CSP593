// userController.js
const { db } = require("../config/db");

// Register a new user with first name, last name, email, and password
exports.registerUser = (req, res) => {
  const { firstName, lastName, email, password } = req.body; // Get user details from request body

  if (!firstName || !lastName || !email || !password) {
    // Validate user details
    return res.status(400).json({ message: "All fields are required" }); // Bad Request
  }

  // Insert user details into the database
  const query = `INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)`;

  // Execute the query to insert user details
  db.query(query, [firstName, lastName, email, password], (err, result) => {
    if (err) {
      console.error("Error inserting user:", err);
      return res.status(500).json({ message: "Error registering user" });
    }
    res.status(201).json({ message: "User registered successfully" });
  });
};

// Login a user with email and password
exports.loginUser = (req, res) => {
  const { email, password } = req.body; // Get email and password from request body

  // Query to fetch user details based on email and password
  const query = `SELECT user_id, first_name, last_name, email FROM users WHERE email = ? AND password = ?`;
  // Execute the query to fetch user details
  db.query(query, [email, password], (err, results) => {
    if (err) {
      console.error("Error during login:", err);
      return res.status(500).json({ message: "Error logging in" });
    }
    if (results.length > 0) {
      // If user exists with the provided credentials
      const user = results[0];
      res.status(200).json({
        // Send user details in response
        id: user.user_id,
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
      });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  });
};
