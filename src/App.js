// API
import "./api/axiosDefaults";

// Bootstrap Components
import Container from "react-bootstrap/Container";

// Context
import { useCurrentUser } from "./contexts/CurrentUserContext";

// CSS
import styles from "./App.module.css";

// Local Components
import NavBar from "./components/NavBar";
import PostCreate from "./pages/posts/PostCreate";
import PostEditFormBase from "./pages/posts/PostEditFormBase";
import PostPage from "./pages/posts/PostPage";
import PostsPage from "./pages/posts/PostsPage";
import ProfileEditForm from "./pages/profiles/ProfileEditForm";
import ProfilePage from "./pages/profiles/ProfilePage";
import SignInForm from "./pages/auth/SignInForm";
import SignUpForm from "./pages/auth/SignUpForm";

// React Router
import { Route, Routes } from "react-router-dom";

function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Routes>
          <Route path="/" element={<PostsPage />} />
          <Route
            path="/inspyrations"
            element={
              <PostsPage
                message="No results found. Try searching for something, or give someone a follow!"
                filter={`owner__followed__owner__profile=${profile_id}&`}
              />
            }
          />
          <Route
            path="/sparks"
            element={
              <PostsPage
                message="No results found. Try searching for something, or give some posts a like!"
                filter={`likes__owner__profile=${profile_id}&ordering=-likes__created_at&`}
              />
            }
          />
          <Route path="/posts/inspyre" element={<PostCreate />} />
          <Route path="/posts/:id" element={<PostPage />} />
          <Route path="/posts/:id/edit" element={<PostEditFormBase />} />
          <Route path="/profiles/:id" element={<ProfilePage />} />
          <Route path="/profiles/:id/edit" element={<ProfileEditForm />} />
          <Route path="/signin" element={<SignInForm />} />
          <Route path="/signup" element={<SignUpForm />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
