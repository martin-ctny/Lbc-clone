import axios from "axios";

const API_URL = "http://localhost:8000/api/posts/";

const getPosts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
const getPost = async (id) => {
  try {
    const response = await axios.get(`${API_URL}${id}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const createPost = async (post) => {
  try {
    const formData = new FormData();
    formData.append("title", post.title);
    formData.append("content", post.content);
    formData.append("uploadFiles", post.uploadFiles);
    formData.append("postLocation", post.adresse);
    post.uploadFiles.forEach((file) => {
      formData.append("uploadFiles", file);
    });
    formData.append(
      "administrative_area_level_1",
      post.adresse.administrative_area_level_1
    );
    formData.append(
      "administrative_area_level_2",
      post.adresse.administrative_area_level_2
    );
    formData.append("country", post.adresse.country);
    formData.append("locality", post.adresse.locality);
    formData.append("postal_code", post.adresse.postal_code);
    formData.append("route", post.adresse.route);
    formData.append("street_number", post.adresse.street_number);
    formData.append("formatted_address", post.adresse.formatted_address);

    return await axios
      .post(API_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        return response.data;
      });
  } catch (err) {
    console.log(err);
  }
};

const deletePost = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}${id}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const PostsService = {
  getPosts,
  getPost,
  createPost,
  deletePost,
};

export default PostsService;
