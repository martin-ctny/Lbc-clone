import { Box, Button } from "@mui/material";
import { useContext, useState } from "react";
import { PostContext } from "../../src/context/PostContex";
import PostsService from "../../src/services/post.service";
import Autocomplete from "../localisation/Autocomplete";

const FilterPostLocation = () => {
  const { newPost, setNewPost, posts, setPosts } = useContext(PostContext);

  const [isFiltered, setIisFiltered] = useState(false);
  const filteredPosts = async () => {
    try {
      const filteredPosts = await PostsService.getPosts(newPost);
      setPosts(filteredPosts);
      setIisFiltered(true);
    } catch (error) {
      console.log(error);
    }
  };

  const resetPosts = async () => {
    try {
      const allPosts = await PostsService.getPosts();
      setPosts(allPosts);
      setIisFiltered(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = (e) => {
    filteredPosts();
  };
  return (
    <Box sx={{ display: "flex" }}>
      <Autocomplete />
      <Button variant="contained" sx={{ mb: 4 }} onClick={handleClick}>
        Filtrer
      </Button>
      {isFiltered && (
        <Button
          variant="contained"
          sx={{ mb: 4 }}
          onClick={() => {
            resetPosts();
          }}
        >
          Reset
        </Button>
      )}
    </Box>
  );
};

export default FilterPostLocation;
