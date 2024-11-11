// userController.js
const { db } = require("../config/db");

exports.registerUser = (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const query = `INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)`;

  db.query(query, [firstName, lastName, email, password], (err, result) => {
    if (err) {
      console.error("Error inserting user:", err);
      return res.status(500).json({ message: "Error registering user" });
    }
    res.status(201).json({ message: "User registered successfully" });
  });
};

exports.loginUser = (req, res) => {
  const { email, password } = req.body;
  const query = `SELECT user_id, first_name, last_name, email FROM users WHERE email = ? AND password = ?`;

  db.query(query, [email, password], (err, results) => {
    if (err) {
      console.error("Error during login:", err);
      return res.status(500).json({ message: "Error logging in" });
    }
    if (results.length > 0) {
      const user = results[0];
      res.status(200).json({
        id: user.user_id,
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
      });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  });
};
