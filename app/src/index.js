import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { PostProvider } from "./src/context/PostContex";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <PostProvider>
    <App />
  </PostProvider>
);
