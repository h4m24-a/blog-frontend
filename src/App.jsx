import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Navigate, BrowserRouter, Routes, Route } from "react-router";

import Homepage from "./pages/homepage";
import BlogPage from "./pages/blogPage";
import LoginPage from "./pages/loginPage";
import SignupPage from "./pages/signupPage";
import Dashboard from "./pages/admin/dashboard";
import AdminBlogPage from "./pages/admin/adminBlogPage";
import AdminHomePage from "./pages/admin/adminHomepage";
import Error from "./pages/Error";
import NotAuthorized from "./pages/notAuthorized";

import { useAuthContext } from "./context/useAuthContext";


const queryClient = new QueryClient();

function App() {

  const { isAuthenticated, role, loading } = useAuthContext();

  if (loading) {
    return <div>Loading...</div>
  }



  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {isAuthenticated ? (
            <>
              <Route path="/" element={<Homepage />} />
              <Route path="/pages/posts/:postId" element={<BlogPage />} />

              {role === "ADMIN" && (
                <>
                  <Route path="/pages/admin/dashboard" element={<Dashboard />}  />
                  <Route path="/pages/admin/posts" element={<AdminHomePage />} />
                  <Route path="/pages/admin/posts/:postId" element={<AdminBlogPage />} />
                </>
              )}

              {role === "USER" && (
                <>
                <Route path="/pages/admin/dashboard" element={<NotAuthorized />}  />
                <Route path="/pages/admin/posts" element={<NotAuthorized />} />
                <Route path="/pages/admin/posts/:postId" element={<NotAuthorized />} />
                </>
              )}




              <Route path="*" element={<Error />} />
            </>

          ) : (
            <>
              <Route path="/api/auth/log-in" element={<LoginPage />} />
              <Route path="/api/auth/sign-up" element={<SignupPage />} />
              <Route path="*" element={<Navigate to="/api/auth/log-in" />}/> {" "} {/*Redirect all other paths to log-in if not authenticated */}
            </>
          )}
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;

