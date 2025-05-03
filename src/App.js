// API
import "./api/axiosDefaults";
import { axiosReq, axiosRes } from "./api/axiosDefaults";

// Bootstrap Components
import Container from "react-bootstrap/Container";

// Context
import { useCurrentUser } from "./contexts/CurrentUserContext";

// CSS
import styles from "./App.module.css";

// Local Components
import ConversationPage from "./pages/messages/ConversationPage";
import ConversationsPage from "./pages/messages/ConversationsPage";
import NavBar from "./components/NavBar";
import PostCreate from "./pages/posts/PostCreate";
import PostEditFormBase from "./pages/posts/PostEditFormBase";
import PostPage from "./pages/posts/PostPage";
import PostsPage from "./pages/posts/PostsPage";
import ProfileEditForm from "./pages/profiles/ProfileEditForm";
import ProfilePage from "./pages/profiles/ProfilePage";
import SignInForm from "./pages/auth/SignInForm";
import SignUpForm from "./pages/auth/SignUpForm";

// Error Pages
import Unauthorized from "./pages/errors/401Unauthorized";
import Forbidden from "./pages/errors/403Forbidden";
import NotFound from "./pages/errors/404NotFound";
import ServiceUnavailable from "./pages/errors/503ServiceUnavailable";

// React
import { useEffect } from "react";

// React Router
import { Route, Routes, useLocation } from "react-router-dom";

function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";
  const location = useLocation();

  useEffect(() => {
    // Reset redirect lock whenever the route changes
    if (axiosReq && axiosRes) {
      axiosReq.isRedirecting = false;
      axiosRes.isRedirecting = false;
    }
  }, [location]);

  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Routes>
          <Route path="/" element={<PostsPage />} />
          <Route
            path="/pyres"
            element={
              <PostsPage
                header="Posts from Creators you follow:"
                message="No results found. Try searching for something, or give someone a follow!"
                filter={`owner__followed__owner__profile=${profile_id}&`}
              />
            }
          />
          <Route
            path="/sparks"
            element={
              <PostsPage
                header="Posts you thought were 🔥:"
                message="No results found. Try searching for something, or give some posts a like!"
                filter={`likes__owner__profile=${profile_id}&ordering=-likes__created_at&`}
              />
            }
          />
          <Route path="/conversations" element={<ConversationsPage />} />
          <Route
            path="/messages/conversation/:id"
            element={<ConversationPage />}
          />

          <Route path="/posts/inspyre" element={<PostCreate />} />
          <Route path="/posts/:id" element={<PostPage />} />
          <Route path="/posts/:id/edit" element={<PostEditFormBase />} />
          <Route path="/profiles/:id" element={<ProfilePage />} />
          <Route path="/profiles/:id/edit" element={<ProfileEditForm />} />
          <Route path="/signin" element={<SignInForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          {/* Custom Error Pages */}
          <Route path="/401" element={<Unauthorized />} />
          <Route path="/403" element={<Forbidden />} />
          <Route path="/503" element={<ServiceUnavailable />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
