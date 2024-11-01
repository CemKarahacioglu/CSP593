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
  };
  userId: number | undefined; // Logged-in user ID (can be undefined)
  deletePost: (postId: number) => void; // Function to delete the post
}

const Post: React.FC<PostProps> = ({ post, userId, deletePost }) => {
  const isOwner = userId === post.user_id; // Check if the logged-in user is the owner of the post
  const [liked, setLiked] = useState(false); // Track if the post is liked
  const [likeCount, setLikeCount] = useState(0); // Track the number of likes
  const [showCommentModal, setShowCommentModal] = useState(false); // State to show/hide comments

  // Fetch initial like count and user like status from the server on component mount
  useEffect(() => {
    const fetchLikeCount = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/likes/count/${post.id}`,
          { params: { userId } } // Pass userId to get the user-specific like status
        );
        setLikeCount(response.data.likeCount);
        setLiked(response.data.userLiked); // Set liked state based on backend response
      } catch (error) {
        console.error("Error fetching like count:", error);
      }
    };
    fetchLikeCount();
  }, [post.id, userId]);

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
        <div className="post-avatar-column">
          <img src={post.avatar} alt="Avatar" className="post-avatar" />
        </div>
        <div className="post-content-column">
          <div className="post-header">
            <strong>{post.user}</strong>
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
            <p>{post.content}</p>
            {post.image_url && (
              <img
                src={post.image_url}
                alt="Post Image"
                className="post-image"
                style={{
                  maxWidth: "100%",
                  maxHeight: "300px",
                }} // for now, I'll remove inline styling later
              />
            )}
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
              <FaRegComment />
            </button>
            <button className="retweet-button">
              <FaRetweet /> {/* Placeholder for retweets */}
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
