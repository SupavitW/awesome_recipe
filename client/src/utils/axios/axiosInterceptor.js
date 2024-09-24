import axiosInstance from './axiosInstance';
import { logoutUser } from '../../slices/user/userAPI';

const axiosInterceptor = (store, navigate) => {
  axiosInstance.interceptors.response.use(
    (res) => res,
    async (err) => {
      const status = err?.response?.status || null;
      if (status === 401) {
        console.log(status);
        // Set a flag in local storage before redirecting
        localStorage.setItem('showSessionExpiredToast', 'true');
        await store.dispatch(logoutUser({ navigate }));
      }
      return Promise.reject(err);
    }
  );
};

export default axiosInterceptor;