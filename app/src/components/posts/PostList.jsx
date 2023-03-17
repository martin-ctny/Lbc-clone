import { Box, Button } from "@mui/material";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PostContext } from "../../src/context/PostContex";
import PostsService from "../../src/services/post.service";

const PostList = () => {
  const navigate = useNavigate();

  const { posts, setPosts } = useContext(PostContext);

  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = async () => {
    try {
      const allPosts = await PostsService.getPosts();
      setPosts(allPosts);
      console.log(allPosts);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (e, id) => {
    e.preventDefault();
    PostsService.deletePost(id);
    const filteredPosts = posts.filter((post) => post._id !== id);
    setPosts(filteredPosts);
  };

  const handleClick = (e, id) => {
    navigate(`/posts/${id}`);
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 5,
        flexWrap: "wrap",
      }}
    >
      {posts?.map((post) => (
        <div
          style={{
            display: "flex",
            width: "300px",
            height: "450px",
            flexDirection: "column",
            gap: "10px",
            justifyContent: "center",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
          }}
          key={post.id}
        >
          {post._id && post.uploadFiles.length > 0 && (
            <img
              style={{ width: "300px", height: "150px", objectFit: "cover" }}
              src={post.uploadFiles[0]?.Location}
              alt=""
            />
          )}
          <h2>{post.title}</h2>
          <p
            style={{
              flex: 1,
              overflow: "scroll",
            }}
          >
            {post.content}
          </p>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="outlined"
              sx={{ mb: 4, width: "100%" }}
              onClick={(e) => handleClick(e, post._id)}
            >
              voir
            </Button>
            <Button
              variant="outlined"
              sx={{ mb: 4, width: "100%" }}
              onClick={(e) => handleDelete(e, post._id)}
            >
              Delete
            </Button>
          </Box>
        </div>
      ))}
    </Box>
  );
};

export default PostList;
