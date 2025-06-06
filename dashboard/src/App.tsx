import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/login";
import Posts from "./pages/posts";
import EditPost from "./pages/editPost";
import NewPost from "./pages/newPost";
import PostDetail from "./pages/postDetail";

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const isAuth = localStorage.getItem("auth") === "true";
  return isAuth ? children : <Navigate to="/login" />;
}
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/posts"
            element={
              <PrivateRoute>
                <Posts />
              </PrivateRoute>
            }
          />
          <Route
            path="/posts/new"
            element={
              <PrivateRoute>
                <NewPost />
              </PrivateRoute>
            }
          />
          <Route
            path="/posts/edit/:id"
            element={
              <PrivateRoute>
                <EditPost />
              </PrivateRoute>
            }
          />
          <Route
            path="/post/:id"
            element={
              <PrivateRoute>
                <PostDetail />
              </PrivateRoute>
            }
          />

          <Route path="*" element={<Navigate to="/posts" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
