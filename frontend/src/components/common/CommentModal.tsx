// CommentModal.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTimes } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import "./CommentModal.css";

interface CommentModalProps {
  postId: number;
  onClose: () => void;
}

interface Comment {
  comment_id: number;
  content: string;
  user_name: string;
  created_at: string;
}

const CommentModal: React.FC<CommentModalProps> = ({ postId, onClose }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/comments/post/${postId}`
        );
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchComments();
  }, [postId]);

  const handleAddComment = async () => {
    if (!newComment) return;
    if (!user) {
      console.error("User is not logged in");
      return;
    }

    console.log("User object:", user);

    try {
      const response = await axios.post("http://localhost:8081/comments/add", {
        userId: user.id, // Dynamic user ID
        postId,
        content: newComment,
      });

      setComments((prev) => [
        ...prev,
        {
          comment_id: response.data.commentId,
          content: newComment,
          user_name: user.name, // Use the actual logged-in user's name
          created_at: new Date().toISOString(),
        },
      ]);
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div className="comment-modal">
      <div className="modal-content">
        <button onClick={onClose} className="close-btn">
          <FaTimes size={20} /> {/* Close icon from react-icons */}
        </button>
        <h3>Comments</h3>
        <div className="comments-list">
          {comments.map((comment) => (
            <div key={comment.comment_id} className="comment">
              <p className="comment-header">
                <span className="comment-user">{comment.user_name}</span>{" "}
                <span className="comment-date">
                  {new Date(comment.created_at).toLocaleDateString()}{" "}
                  {new Date(comment.created_at).toLocaleTimeString()}
                </span>
              </p>
              <p className="comment-content">{comment.content}</p>
            </div>
          ))}
        </div>
        <textarea
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="comment-input"
        ></textarea>
        <button onClick={handleAddComment} className="add-comment-btn">
          Comment
        </button>
      </div>
    </div>
  );
};

export default CommentModal;
