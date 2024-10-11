// PostFeed.tsx
import React, { useState, useEffect } from "react";
import Post from "./Post";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import PostInput from "./PostInput";

// Define the shape of a Post object
interface PostType {
  post_id: number;
  user_id: number; // To identify the author of the post
  content: string;
  created_at: string;
  first_name: string;
  last_name: string;
  image_url?: string;
}

const PostFeed: React.FC = () => {
  const { user } = useAuth(); // Get the logged-in user from AuthContext
  const userId = user?.id; // Get the logged-in user's ID

  const [posts, setPosts] = useState<PostType[]>([]); // State to hold real posts
  const [loading, setLoading] = useState(true); // Loading state to show while fetching posts

  // Dummy data for initial posts
  const dummyPosts = [
    {
      post_id: 19,
      user_id: 19,
      first_name: "John",
      last_name: "Doe",
      content: "This is my first post!",
      created_at: "2024-09-22 11:58:47",
    },
    {
      post_id: 29,
      user_id: 29,
      first_name: "Jane",
      last_name: "Smith",
      content: "Cats are the best!",
      created_at: "2024-09-21 09:26:25",
    },
    {
      post_id: 39,
      user_id: 39,
      first_name: "John",
      last_name: "Doe",
      content: "I want a car shaped like a cat",
      created_at: "2024-09-21 09:30:25",
    },
  ];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Fetch posts from the backend
        const response = await axios.get("http://localhost:8081/posts");
        console.log("Fetched posts:", response.data);
        const fetchedPosts = response.data; // The posts fetched from the backend

        // Combine the dummy posts with the fetched posts from the backend
        const combinedPosts = [...fetchedPosts, ...dummyPosts];

        // Sort posts by creation time, newest first
        combinedPosts.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );

        setPosts(combinedPosts); // Set the combined posts data
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error("Error fetching posts:", error);
        setLoading(false); // Stop loading on error
      }
    };

    fetchPosts(); // Call the function to fetch posts
  }, []); // The empty array ensures this only runs once when the component mounts

  // Function to add a new post to the top of the feed
  const addNewPost = (newPost: PostType) => {
    setPosts([newPost, ...posts]);
  };

  // Function to delete a post
  const handleDeletePost = async (postId: number) => {
    try {
      await axios.delete(`http://localhost:8081/posts/${postId}`); // Simulate deletion from backend
      setPosts(posts.filter((post) => post.post_id !== postId)); // Update the state to remove the deleted post
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show a loading message while posts are being fetched
  }

  return (
    <div className="post-feed">
      {/* Pass addNewPost function to PostInput */}
      <PostInput addNewPost={addNewPost} />
      {posts.length === 0 ? (
        <p>No posts available</p>
      ) : (
        posts.map((post) => (
          <Post
            key={post.post_id}
            post={{
              user: `${post.first_name} ${post.last_name}`, // Concatenate first and last name
              content: post.content,
              avatar: "https://via.placeholder.com/50", // Placeholder avatar
              time: new Date(post.created_at).toLocaleString(), // Format the timestamp
              id: post.post_id,
              user_id: post.user_id, // Pass user_id to check if it's the post owner
              image_url: post.image_url || null, // Use the image URL if available
            }}
            userId={user?.id} // Pass logged-in user's ID to identify if they own the post
            deletePost={handleDeletePost} // Pass delete function to Post component
          />
        ))
      )}
    </div>
  );
};

export default PostFeed;
