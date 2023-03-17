import { Box, Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PostsService from "../../src/services/post.service";
import ModalPhoto from "../modalphoto/ModalPhoto";

const PostComponent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState({});

  useEffect(() => {
    getPost();
  }, []);

  const handleNavigate = (e) => {
    e.preventDefault();
    navigate(`/posts/${id}/edit`);
  };

  const getPost = async () => {
    try {
      const post = await PostsService.getPost(id);
      setPost(post);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(post);
  }, [post]);

  return (
    <Box>
      <Grid container spacing={3}>
        {post?.uploadFiles?.length > 2 ? (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              {post._id && post.uploadFiles.length > 0 && (
                <img
                  style={{ width: "100%" }}
                  src={post.uploadFiles[0]?.Location}
                  alt=""
                />
              )}{" "}
            </Grid>
            <Grid item xs={12} md={6} container>
              <Grid item xs={12}>
                {post._id && post.uploadFiles.length > 0 && (
                  <img
                    style={{ width: "50%" }}
                    src={post.uploadFiles[1]?.Location}
                    alt=""
                  />
                )}
              </Grid>
              <Grid item xs={12}>
                {post._id && post.uploadFiles.length > 0 && (
                  <img
                    style={{ width: "50%" }}
                    src={post.uploadFiles[2]?.Location}
                    alt=""
                  />
                )}
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <Grid item xs={12} sm={6} md={4} lg={3}>
            {post._id && post.uploadFiles.length > 0 && (
              <img
                style={{ width: "100%" }}
                src={post.uploadFiles[0]?.Location}
                alt=""
              />
            )}
          </Grid>
        )}
      </Grid>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <ModalPhoto files={post.uploadFiles} />

      <Button onClick={handleNavigate}>Edit</Button>
    </Box>
  );
};

export default PostComponent;
