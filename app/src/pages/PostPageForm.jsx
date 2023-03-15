import PostForm from "../components/posts/PostForm";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import ModalPhoto from "../components/modalphoto/ModalPhoto";

const PostPageForm = () => {
  const navigate = useNavigate();

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
      <PostForm />
    </Box>
  );
};

export default PostPageForm;
