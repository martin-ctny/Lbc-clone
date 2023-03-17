import { Button, Typography } from "@mui/material";
import PostComponent from "../components/posts/PostComponent";
import { useNavigate } from "react-router-dom";

const PostPageOne = () => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    navigate("/");
  };
  return (
    <div>
      <Button variant="outlined" sx={{ mb: 4 }} onClick={handleClick}>
        Acceuil
      </Button>
      <Typography variant="h2" sx={{ mb: 2 }}>
        One Post
      </Typography>
      <PostComponent />
    </div>
  );
};

export default PostPageOne;
