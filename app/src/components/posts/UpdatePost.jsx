import { TextField, Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PostContext } from "../../src/context/PostContex";
import PostsService from "../../src/services/post.service";
import DropZoneUpdate from "../dropzone/DropZoneUpdate";
import Autocomplete from "../localisation/Autocomplete";
import MyStepper from "../mystepper/MyStepper";

const UpdatePost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const { newPost, setNewPost, posts, setPosts } = useContext(PostContext);

  useEffect(() => {
    console.log(id);
    getPost();
  }, []);
  useEffect(() => {
    console.log(newPost);
  }, [newPost]);

  const handleChange = (e) => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  };

  const getPost = async () => {
    try {
      const post = await PostsService.getPost(id);
      setNewPost(post);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = async () => {
    await PostsService.updatePost(id, newPost);
    setNewPost({});
    navigate(`/posts/${id}`);
  };

  const handleNext = (e) => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleNavigate = () => {
    navigate(`/posts/${id}`);
  };

  return (
    <>
      <Button onClick={handleNavigate}>Annuler</Button>
      <MyStepper activeStep={activeStep} />
      {activeStep === 0 && (
        <>
          <TextField
            label="Titre du post"
            variant="outlined"
            onChange={handleChange}
            value={newPost.title}
            type="text"
            name="title"
            id="title"
          />
          <TextField
            label="Description du post"
            variant="outlined"
            multiline
            rows={4}
            onChange={handleChange}
            value={newPost.content}
            type="text"
            name="content"
            id="content"
          />

          <Autocomplete />

          <Button variant="contained" onClick={(e) => handleNext(e)}>
            Next
          </Button>
        </>
      )}
      {activeStep === 1 && (
        <>
          <DropZoneUpdate />
          <Button variant="contained" onClick={() => handleClick()}>
            Submit
          </Button>
        </>
      )}
    </>
  );
};

export default UpdatePost;
