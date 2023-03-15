import PostList from "../components/posts/PostList";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const HomePage = () => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    navigate("/posts/create");
  };
  return (
    <div className="homePage">
      <Button variant="outlined" sx={{ mb: 4 }} onClick={handleClick}>
        Creer un nouveau post
      </Button>
      <h1>Acceuil</h1>
      <PostList />
    </div>
  );
};

export default HomePage;
