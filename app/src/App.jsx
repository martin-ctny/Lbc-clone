import { Container } from "@mui/system";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UpdatePost from "./components/posts/UpdatePost";
import HomePage from "./pages/HomePage";
import PostPageForm from "./pages/PostPageForm";
import PostPageOne from "./pages/PostPageOne";

function App() {
  return (
    <Container sx={{ pt: 5 }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/posts/create" element={<PostPageForm />} />
          <Route path="/posts/:id" element={<PostPageOne />} />
          <Route path="/posts/:id/edit" element={<UpdatePost />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
