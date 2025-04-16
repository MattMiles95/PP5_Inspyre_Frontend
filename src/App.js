// API
import "./api/axiosDefaults";

// Bootstrap Components
import Container from "react-bootstrap/Container";

// CSS
import styles from "./App.module.css";

// Local Components
import NavBar from './components/NavBar';
import PostCreate from "./pages/posts/PostCreate";
import PostPage from "./pages/posts/PostPage";
import PostsPage from "./pages/posts/PostsPage";
import SignInForm from "./pages/auth/SignInForm";
import SignUpForm from "./pages/auth/SignUpForm";

// React Router
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Routes>
          <Route path="/" element={<PostsPage />} />
          <Route path="/posts/inspyre" element={<PostCreate />} />
          <Route path="/posts/:id" element={<PostPage />} />
          <Route path="/sparks" element={<h1>Sparks</h1>} />
          <Route path="/profile" element={<h1>Profile</h1>} />
          <Route path="/signin" element={<SignInForm />} />
          <Route path="/signup" element={<SignUpForm />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
