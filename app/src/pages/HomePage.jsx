import PostList from "../components/posts/PostList";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

import FilterPostLocation from "../components/posts/FilterPostLocation";
import { useState } from "react";
import GeoLocalisation from "../components/localisation/Geolocalisation";

const HomePage = ({ newPost, setNewPost, address, setAddress }) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    navigate("/posts/create");
  };
  return (
    <div className="homePage">
      <GeoLocalisation address={address} setAddress={setAddress} />

      <Button variant="outlined" sx={{ mb: 4 }} onClick={handleClick}>
        Creer un nouveau post
      </Button>
      <h1>Acceuil</h1>
      <FilterPostLocation />
      <PostList />
    </div>
  );
};

export default HomePage;
