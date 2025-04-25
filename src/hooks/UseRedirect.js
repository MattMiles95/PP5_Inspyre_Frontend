// React
import { useEffect } from "react"

// API
import axios from "axios"

// React Router
import { useNavigate } from "react-router-dom"

export const useRedirect = (userAuthStatus) => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleMount = async () => {
            try {
                await axios.post("/dj-rest-auth/token/refresh/");
                if (userAuthStatus === 'loggedIn') {
                    navigate("/");
                }
            } catch (err) {
                if (userAuthStatus === 'loggedOut') {
                    navigate("/signin");
                }
            }
        };

        handleMount();
    }, [navigate, userAuthStatus]);
}