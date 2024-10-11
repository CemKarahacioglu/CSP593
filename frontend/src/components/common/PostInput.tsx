import React, { useState, useRef } from "react";
import { FaImage, FaSmile, FaMapMarkerAlt } from "react-icons/fa";
import axios from "axios";
import { useAuth } from "../../context/AuthContext"; // Import AuthContext to get the logged-in user

interface PostInputProps {
  addNewPost: (post: any) => void; // Prop to pass new post to parent component
}

const PostInput: React.FC<PostInputProps> = ({ addNewPost }) => {
  const [content, setContent] = useState("");
  const { user } = useAuth(); // Access the logged-in user information from AuthContext
  const [imageFile, setImageFile] = useState<File | null>(null); // State to store the image file
  const [imagePreview, setImagePreview] = useState<string | null>(null); // State for image preview

  const fileInputRef = useRef<HTMLInputElement>(null); // Reference to the file input element

  // Function to handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setImageFile(selectedFile); // Store the selected image file
      setImagePreview(URL.createObjectURL(selectedFile)); // Set the image preview URL
    }
  };

  // Function to handle the post submission
  const handlePostSubmit = async () => {
    if (!content) {
      alert("Please enter something to post!");
      return;
    }

    if (!user) {
      alert("User not logged in");
      return;
    }

    const formData = new FormData(); // FormData to handle both text and image
    formData.append("userId", user.id); // Append userId
    formData.append("content", content); // Append post content

    if (imageFile) {
      formData.append("image", imageFile); // Append image if selected
    }

    try {
      // Send both the text and image in one request
      const response = await axios.post(
        "http://localhost:8081/posts/create-post",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        alert("Post created successfully!");

        // Create the new post object with necessary properties
        const newPost = {
          post_id: response.data.postId, // Get the ID of the new post from the response
          user_id: user.id,
          content: content,
          created_at: new Date().toISOString(), // Use the current date and time
          first_name: user.name.split(" ")[0], // Extract the first name from the full name
          last_name: user.name.split(" ")[1], // Extract the last name from the full name
          image_url: response.data.imageUrl || null, // Handle image URL from response
        };

        // Pass the new post back to the parent component
        addNewPost(newPost);

        // Reset textarea and image file after submission
        setContent("");
        setImageFile(null);
        setImagePreview(null);
      }
    } catch (error) {
      console.error("Error creating post:", error);
      alert("There was an error creating the post.");
    }
  };

  // Function to trigger hidden file input
  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger the file input click event
    }
  };

  return (
    <div className="post-input-container">
      <div className="post-avatar-column">
        <img
          src="https://via.placeholder.com/50"
          alt="Avatar"
          className="post-avatar"
        />
      </div>
      <div className="post-input-content">
        <textarea
          placeholder="What is on your mind?"
          className="post-textarea"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>

        {/* Hidden file input */}
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }} // Hide the file input
          accept="image/*"
          onChange={handleImageChange}
        />

        {/* Image Preview */}
        {imagePreview && (
          <div className="image-preview">
            <img
              src={imagePreview}
              alt="Selected"
              style={{ maxWidth: "100%", maxHeight: "200px" }}
            />
            <button onClick={() => setImagePreview(null)}>Remove Image</button>
          </div>
        )}

        <div className="post-input-options">
          <FaImage onClick={handleImageClick} style={{ cursor: "pointer" }} />
          <FaSmile />
          <FaMapMarkerAlt />
          <button className="post-btn" onClick={handlePostSubmit}>
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostInput;
