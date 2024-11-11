const express = require("express");
const router = express.Router();
const {
  addRetweet,
  getPostsWithRetweets,
} = require("../controllers/retweetController"); // Destructuring import

// Route to add a retweet
router.post("/add", addRetweet);

// Route to get all posts including retweets
router.get("/", getPostsWithRetweets);

module.exports = router;
