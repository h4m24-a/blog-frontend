import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Navigate, BrowserRouter, Routes, Route } from "react-router";

import Homepage from "./pages/homepage";
import BlogPage from "./pages/blogPage";
import LoginPage from "./pages/loginPage";
import SignupPage from "./pages/signupPage";
import Error from "./pages/Error";

import { useAuthContext } from "./context/useAuthContext";


const queryClient = new QueryClient();

function App() {

  const { isAuthenticated } = useAuthContext();



  return (
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            { isAuthenticated ? (
              <>
                <Route path="/" element={<Homepage />} />
                <Route path="/pages/posts/:postId" element={<BlogPage />} />
                <Route path="*" element={<Error />} />
              </>
            ) : (
              <>
              <Route path="/api/auth/log-in" element={<LoginPage />} />
              <Route path="/api/auth/sign-up" element={<SignupPage />} />
              <Route path="*" element={<Navigate to="/api/auth/log-in" />} />     { /*Redirect all other paths to log-in if not authenticated */}
              </>
            ) }
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
  );
}

export default App;

