import Homepage from "./pages/homepage";
import BlogPage from "./pages/blogPage";
import Error from "./pages/error";
import { BrowserRouter, Routes, Route } from "react-router";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/pages/blog/:id" element={<BlogPage />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
