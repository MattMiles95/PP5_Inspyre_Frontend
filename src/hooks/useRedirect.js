// React
import { useEffect } from "react";

// API
import axios from "axios";

// React Router
import { useNavigate } from "react-router-dom";

// Utils
import { hasTokenTimestamp } from "../utils/utils";

export const useRedirect = (userAuthStatus) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleMount = async () => {
      if (!hasTokenTimestamp()) {
        if (userAuthStatus === "loggedOut") {
          navigate("/signin");
        }
        return;
      }

      try {
        await axios.post("/dj-rest-auth/token/refresh/");
        if (userAuthStatus === "loggedIn") {
          navigate("/");
        }
      } catch (err) {
        if (userAuthStatus === "loggedOut") {
          navigate("/signin");
        }
      }
    };

    handleMount();
  }, [navigate, userAuthStatus]);
};
