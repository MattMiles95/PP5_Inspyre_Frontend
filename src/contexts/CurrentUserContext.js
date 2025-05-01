// API
import axios from "axios";
import { axiosReq, axiosRes } from "../api/axiosDefaults";

// React Context
import { createContext, useContext, useEffect, useMemo, useState } from "react";

// React Router
import { useNavigate } from "react-router-dom";

// Utils
import {
  removeTokenTimestamp,
  shouldRefreshToken,
  hasTokenTimestamp,
} from "../utils/utils";

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  const handleMount = async () => {
    if (!hasTokenTimestamp()) return;

    try {
      const { data } = await axiosRes.get("/dj-rest-auth/user/");
      setCurrentUser({
        ...data,
        id: data.pk || data.id,
      });
    } catch (err) {
      if (err.response?.status === 401) return;
    }
  };

  useEffect(() => {
    handleMount();
  }, []);

  useMemo(() => {
    axiosReq.interceptors.request.use(
      async (config) => {
        if (shouldRefreshToken() && hasTokenTimestamp()) {
          try {
            await axios.post("/dj-rest-auth/token/refresh/");
          } catch (err) {
            setCurrentUser((prevCurrentUser) => {
              if (prevCurrentUser) {
                navigate("/signin");
              }
              return null;
            });
            removeTokenTimestamp();
            return config;
          }
        }
        return config;
      },
      (err) => {
        return Promise.reject(err);
      }
    );

    // response interceptor to refresh token if response is 401
    axiosRes.interceptors.response.use(
      (response) => response,
      async (err) => {
        if (err.response?.status === 401) {
          try {
            await axios.post("/dj-rest-auth/token/refresh/");
          } catch (err) {
            setCurrentUser((prevCurrentUser) => {
              if (prevCurrentUser) {
                navigate("/signin");
              }
              return null;
            });
            removeTokenTimestamp();
          }
          return axios(err.config);
        }
        return Promise.reject(err);
      }
    );
  }, [navigate]);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (!hasTokenTimestamp()) return;

      try {
        await axios.post("/dj-rest-auth/token/refresh/");
      } catch (err) {
        setCurrentUser(null);
        navigate("/signin");
      }
    }, 4 * 60 * 1000);

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};
