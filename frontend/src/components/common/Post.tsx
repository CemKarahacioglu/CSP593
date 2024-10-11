// Post.tsx
import React from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import "./Post.css";

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
        </div>
      </div>
    </div>
  );
};

export default Post;
