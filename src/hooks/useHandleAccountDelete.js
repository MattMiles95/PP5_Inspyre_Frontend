// API
import { axiosReq } from "../api/axiosDefaults";

// Hooks
import { useHandleSignOut } from "./useHandleSignOut";

export const useHandleAccountDelete = () => {
  const handleSignOut = useHandleSignOut();

  const handleAccountDelete = async () => {
    try {
      await axiosReq.delete("/users/delete/");
      handleSignOut();
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  return handleAccountDelete;
};
