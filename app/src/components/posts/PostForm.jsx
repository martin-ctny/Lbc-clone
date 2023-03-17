import { useContext, useState } from "react";
import TextField from "@mui/material/TextField";
import { Box, Button } from "@mui/material";
import MyDropzone from "../dropzone/DropZone";
import PostsService from "../../src/services/post.service";
import Autocomplete from "../localisation/Autocomplete";
import MyStepper from "../mystepper/MyStepper";
import { PostContext } from "../../src/context/PostContex";

const PostForm = () => {
  const { newPost, setNewPost, address, setAdress } = useContext(PostContext);

  const [success, setSuccess] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const handleChange = (e) => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
    console.log(newPost);
  };

  const handleNext = (e) => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleClick = (e) => {
    PostsService.createPost(newPost);
    setSuccess(true);
    setNewPost({});
    setActiveStep(0);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      <MyStepper activeStep={activeStep} />
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          ".MuiInputBase-root, .MuiButton-root": {
            mb: 2,
          },
        }}
      >
        {activeStep === 0 && (
          <>
            <TextField
              label="Titre du post"
              variant="outlined"
              onChange={handleChange}
              value={newPost.title || ""}
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
              value={newPost.content || ""}
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
            <MyDropzone newPost={newPost} setNewPost={setNewPost} />
            <Button variant="contained" onClick={() => handleClick()}>
              Submit
            </Button>
          </>
        )}
        {success && <p style={{ color: "green" }}>Post created</p>}
      </Box>
    </Box>
  );
};

export default PostForm;
