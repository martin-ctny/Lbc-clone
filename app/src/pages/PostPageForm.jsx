import PostForm from "../components/posts/PostForm";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import Geolocalisation from "../components/localisation/Geolocalisation";
import { useContext, useState } from "react";
import { PostContext } from "../src/context/PostContex";

const PostPageForm = () => {
  const navigate = useNavigate();

  const { newPost, setNewPost, address, setAddress } = useContext(PostContext);

  const handleClick = (e) => {
    navigate("/");
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 5,
      }}
    >
      <Geolocalisation address={address} setAddress={setAddress} />
      <Button
        variant="outlined"
        sx={{ mb: 4, width: "200px" }}
        onClick={handleClick}
      >
        Acceuil
      </Button>
      <Typography variant="h2" sx={{ mb: 2 }}>
        Creer un nouveau post
      </Typography>
      <PostForm
        newPost={newPost}
        setNewPost={setNewPost}
        address={address}
        setAddress={setAddress}
      />
    </Box>
  );
};

export default PostPageForm;
