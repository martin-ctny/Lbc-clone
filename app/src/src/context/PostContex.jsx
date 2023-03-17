import { createContext, useState } from "react";

const PostContext = createContext();

const PostProvider = ({ children }) => {
  const [newPost, setNewPost] = useState({});
  const [address, setAddress] = useState(null);
  const [posts, setPosts] = useState([]);

  return (
    <PostContext.Provider
      value={{ newPost, setNewPost, address, setAddress, posts, setPosts }}
    >
      {children}
    </PostContext.Provider>
  );
};

export { PostProvider, PostContext };
