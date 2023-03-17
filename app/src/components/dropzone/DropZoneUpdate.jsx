import { useContext, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { PostContext } from "../../src/context/PostContex";

function MyDropzone() {
  const [imageURLs, setImageURLs] = useState(Array(7).fill(""));
  const [files, setFiles] = useState([]);

  const { setNewPost, newPost } = useContext(PostContext);

  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone({
      accept: "image/*",
      onDrop: (acceptedFiles) => {
        const newImageURLs = [...imageURLs];
        acceptedFiles.map((file, index) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);

          reader.onload = () => {
            newImageURLs[index] = reader.result;
            setImageURLs(newImageURLs);
          };
        });
        setFiles([...files, ...acceptedFiles]);
      },
    });

  const filesInput = files.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const deleteImage = (index, e) => {
    e.stopPropagation();
    setFiles(files.filter((file, i) => i !== index));
    setImageURLs(imageURLs.filter((url, i) => i !== index));
  };

  useEffect(() => {
    const newImageURLs = [...imageURLs];
    files.map((file, index) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        newImageURLs[index] = reader.result;
        setImageURLs(newImageURLs);
      };
    });
    setNewPost((newPost) => {
      return { ...newPost, uploadFiles: files };
    });
  }, [files]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} {...getRootProps()}>
        <Grid item xs={3}>
          <Paper
            className={`dropzone-paper${isDragActive ? " active" : ""}`}
            sx={{
              height: 100,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "2px dashed orange",
              cursor: "pointer",
              color: "orange",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <input {...getInputProps()} />
            <span>Ajouter des photos</span>
          </Paper>
        </Grid>
        {[...Array(7)].map((_, index) => (
          <Grid item xs={3}>
            <Paper
              className={`dropzone-paper${isDragActive ? " active" : ""} ${
                imageURLs[index] ? "uploaded" : ""
              }`}
              sx={{
                height: 100,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                backgroundImage: `url(${imageURLs[index]})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "relative",
              }}
            >
              <input {...getInputProps()} />
              {imageURLs[index] && (
                <Box
                  className="delete"
                  sx={{ position: "absolute", top: -10, right: -10 }}
                >
                  <IconButton onClick={(e) => deleteImage(index, e)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              )}
              {!imageURLs[index] ? <span> Photo {index + 1}</span> : null}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default MyDropzone;
