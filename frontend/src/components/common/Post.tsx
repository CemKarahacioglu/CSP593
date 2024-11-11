// Post.tsx
import React, { useState, useEffect } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaRegComment, FaRetweet, FaHeart } from "react-icons/fa";
import "./Post.css";
import CommentModal from "./CommentModal";
import axios from "axios";

interface PostProps {
  post: {
    user: string;
    content: string;
    avatar: string;
    time: string;
    id: number; // The post ID, needed to identify posts
    user_id: number; // The ID of the user who created the post
    image_url?: string | null;
    retweeted_post_id?: number | null; // Reference to original post ID if it's a retweet
  };
  userId: number | undefined; // Logged-in user ID (can be undefined)
  deletePost: (postId: number) => void; // Function to delete the post
}

const Post: React.FC<PostProps> = ({ post, userId, deletePost }) => {
  const isOwner = userId === post.user_id; // Check if the logged-in user is the owner of the post
  const [liked, setLiked] = useState(false); // Track if the post is liked
  const [likeCount, setLikeCount] = useState(0); // Track the number of likes
  const [showCommentModal, setShowCommentModal] = useState(false); // State to show/hide comments
  const [commentCount, setCommentCount] = useState(0); // Track the number of comments

  const [retweetCount, setRetweetCount] = useState(0);
  const [originalPost, setOriginalPost] = useState<{
    user: string;
    content: string;
    avatar: string;
    image_url?: string | null;
  } | null>(null); // Store original post details if it's a retweet

  // Fetch initial counts, like status, comment count, and retweet info on component mount
  // Fetch initial counts and original post data if it's a retweet
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const likeResponse = await axios.get(
          `http://localhost:8081/likes/count/${post.id}`,
          { params: { userId } }
        );
        setLikeCount(likeResponse.data.likeCount);
        setLiked(likeResponse.data.userLiked);

        const commentResponse = await axios.get(
          `http://localhost:8081/comments/count/${post.id}`
        );
        setCommentCount(commentResponse.data.commentCount);

        const retweetResponse = await axios.get(
          `http://localhost:8081/retweets/count/${post.id}`
        );
        setRetweetCount(retweetResponse.data.retweetCount);

        // Fetch original post data if this post is a retweet
        if (post.retweeted_post_id) {
          const originalPostResponse = await axios.get(
            `http://localhost:8081/posts/${post.retweeted_post_id}`
          );
          setOriginalPost(originalPostResponse.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchCounts();
  }, [post.id, post.retweeted_post_id, userId]);

  // Function to handle retweet
  const handleRetweet = async () => {
    try {
      await axios.post("http://localhost:8081/retweets/add", {
        userId,
        postId: post.id,
      });
      setRetweetCount((prev) => prev + 1);
    } catch (error) {
      console.error("Error retweeting post:", error);
    }
  };

  // Function to handle like/unlike
  const handleLike = async () => {
    try {
      const response = await axios.post("http://localhost:8081/likes/like", {
        userId,
        postId: post.id,
      });
      setLiked(response.data.liked); // Update liked state based on backend response
      setLikeCount(response.data.likeCount); // Set likeCount directly from backend response
    } catch (error) {
      console.error("Error handling like:", error);
    }
  };

  return (
    <div className="post">
      <div className="post-container">
        {/* Show original author info if this is a retweet */}
        {post.retweeted_post_id && originalPost ? (
          <div className="retweet-info">
            <FaRetweet style={{ marginRight: "5px" }} />
            Retweeted from {originalPost.user}
          </div>
        ) : null}
        <div className="post-avatar-column">
          <img
            src={originalPost ? originalPost.avatar : post.avatar}
            alt="Avatar"
            className="post-avatar"
          />
        </div>
        <div className="post-content-column">
          <div className="post-header">
            <strong>{originalPost ? originalPost.user : post.user}</strong>
            <span className="post-time">{post.time}</span>
            {isOwner && (
              <button
                className="delete-btn"
                onClick={() => deletePost(post.id)}
              >
                <RiDeleteBinLine className="delete-icon" /> {/* Delete icon */}
              </button>
            )}
          </div>
          <div className="post-body">
            <p>{originalPost ? originalPost.content : post.content}</p>
            {originalPost && originalPost.image_url ? (
              <img
                src={originalPost.image_url}
                alt="Original Post Image"
                className="post-image"
                style={{
                  maxWidth: "100%",
                  maxHeight: "300px",
                }}
              />
            ) : post.image_url ? (
              <img
                src={post.image_url}
                alt="Post Image"
                className="post-image"
                style={{
                  maxWidth: "100%",
                  maxHeight: "300px",
                }}
              />
            ) : null}
          </div>
          <div className="post-footer">
            <button onClick={handleLike} className="like-button">
              <FaHeart
                style={{ marginRight: "5px", color: liked ? "red" : "gray" }}
              />
              {likeCount}
            </button>
            <button
              onClick={() => setShowCommentModal(true)}
              className="comment-button"
            >
              <FaRegComment style={{ marginRight: "5px" }} />
              {commentCount}
            </button>
            <button onClick={handleRetweet} className="retweet-button">
              <FaRetweet style={{ marginRight: "5px" }} />
              {retweetCount}
            </button>
          </div>
        </div>
      </div>
      {/* Render Comment Modal */}
      {showCommentModal && (
        <CommentModal
          postId={post.id}
          onClose={() => setShowCommentModal(false)}
        />
      )}
    </div>
  );
};

export default Post;
