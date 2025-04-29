// API
import { axiosReq, axiosRes } from "../api/axiosDefaults";

// Context
import { useSetCurrentUser } from "../contexts/CurrentUserContext";

// React
import { useCallback } from "react";

// React Router
import { useNavigate } from "react-router-dom";

// Utils
import { removeTokenTimestamp } from "../utils/utils";

export const useHandleSignOut = () => {
  const navigate = useNavigate();
  const setCurrentUser = useSetCurrentUser();

  const handleSignOut = useCallback(() => {
    setCurrentUser(null);
    removeTokenTimestamp();
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    if (axiosReq.interceptors.request.handlers.length > 0) {
      axiosReq.interceptors.request.handlers = [];
    }
    if (axiosRes.interceptors.response.handlers.length > 0) {
      axiosRes.interceptors.response.handlers = [];
    }

    navigate("/signin");
  }, [navigate, setCurrentUser]);

  return handleSignOut;
};
