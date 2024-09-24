import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import styles from './Login.module.css';

import Button from '../../components/button/Button';
import { resetError } from '../../slices/user/userSlice';
import { fetchUser } from '../../slices/user/userAPI';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Login page
export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const form = useForm({
    defaultValues: {
      username: '',
      password: ''
    },
  });
  // destructuring form methods
  const { register, handleSubmit, formState, reset } = form;
  // destructuring form state
  const { errors, isSubmitting, isSubmitSuccessful } = formState;

  const onSubmit = (data) => {
    dispatch(fetchUser(data));
  }

  const onError = (errors) => {
    console.log('Form errors:', errors);
  }

  // Reset error when password field is focused
  const handlePasswordFocus = () => {
    dispatch(resetError());
  };

  useEffect(() => {
    // Check if the session expired flag is set in local storage
    if (localStorage.getItem('showSessionExpiredToast') === 'true') {
      toast.warn('Your session has expired. Please login again.');
      // Remove the flag after showing the toast to prevent it from showing again
      localStorage.removeItem('showSessionExpiredToast');
    }
  }, []);

  useEffect(() => {
    return () => {
      dispatch(resetError());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (user.error === 'User is not authenticated, please login') {
      dispatch(resetError());
    }
  }, [user.error, dispatch]);

  useEffect(() => {
    if (user.loggedIn) {
      navigate('/');
    }
  }, [user.loggedIn, navigate]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);


  return (
    <>
      <div className={styles.login_main}>
        <div className={styles.login_body_container}>
          <ToastContainer
            className={styles.toastContainerClass}
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored" />
          <div className={styles.login_body_logo}>
            <NavLink to='/' title="Go to Homepage" id="logo">
              <h2>AWESOME <span className="highlight">RECIPES</span></h2>
            </NavLink>
          </div>
          <div className={styles.login_body_header}>
            <h2>Login to your account</h2>
          </div>
          <div className={styles.login_body_formContainer}>
            <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
              <label htmlFor="username">Username</label>
              <input type="username" id="username" placeholder='Enter your username'
                {...register('username', { required: '*Username is required' })} />
              {/* render the form validation warning */}
              {errors.username && <p className={styles.error}>{errors.username.message}</p>}


              <label htmlFor="password">Password</label>
              <input type="password" id="password" placeholder='Enter your password'
                {...register('password', { required: '*Password is required' })} onFocus={handlePasswordFocus} />
              {errors.password && <p className={styles.error}>{errors.password.message}</p>}
              {user.error && <p className={styles.error}>*{user.error}</p>}
              <Button title='LOG IN' disabled={isSubmitting || user.loading} className={styles.btn} />
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
