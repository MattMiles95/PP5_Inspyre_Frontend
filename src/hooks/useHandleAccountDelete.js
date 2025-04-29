// API
import { axiosReq } from "../api/axiosDefaults";

// Hooks
import { useHandleSignOut } from "./useHandleSignOut";

// React Router
import { useNavigate } from "react-router-dom";

export const useHandleAccountDelete = () => {
  const navigate = useNavigate();
  const handleSignOut = useHandleSignOut();

  const handleAccountDelete = async () => {
    try {
      await axiosReq.delete("/users/delete/");
      handleSignOut();
      navigate("/signup");
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  return handleAccountDelete;
};
