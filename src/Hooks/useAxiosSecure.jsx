import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuthhook from './useAuthhook'; // Import the custom hook

const axiosInstance = axios.create({
  baseURL: 'https://where-is-it-server-side-three.vercel.app',
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { logOut } = useAuthhook(); // Use useAuthhook inside the hook
  const navigate = useNavigate();

  useEffect(() => {
    const interceptor = axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        // console.log('Error caught in interceptor', error);

        if (error.response?.status === 401 || error.response?.status === 403) {
          // console.log('Need to logout the user');
          try {
            await logOut(); // Log out the user if unauthorized
            // console.log('Logged out successfully');
            navigate('/login');
          } catch (error) {
            // console.log('Error during logout', error);
          }
        }
        return Promise.reject(error);
      }
    );

    // Cleanup interceptor on component unmount
    return () => {
      axiosInstance.interceptors.response.eject(interceptor);
    };
  }, [logOut, navigate]);

  return axiosInstance;
};

export default useAxiosSecure;