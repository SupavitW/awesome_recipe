import React, { useEffect } from 'react'
import styles from './SignUp.module.css';
import { useForm } from 'react-hook-form';
import { useNavigate, redirect, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import ReactLoading from 'react-loading';

import Button from '../../components/button/Button';
import { createUser } from '../../slices/signUp/signUpAPI';
import { resetSignupState } from '../../slices/signUp/signUpSlice';
import { fetchUser } from '../../slices/user/userAPI';
import signUpSchema from '../../validation/signUp/signUpValidation';
import { yupResolver } from '@hookform/resolvers/yup';


export default function SignUp() {
    const user = useSelector(state => state.user);
    const signUp = useSelector(state => state.signUp);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const form = useForm({
        defaultValues: {
            username: '',
            password: '',
            confirmPassword: '',
            firstname: '',
            lastname: '',
        },
        mode: 'onBlur', //customize form validation mode
        resolver: yupResolver(signUpSchema)
    });
    // destructuring form methods
    const { register, handleSubmit, formState, getValues, reset } = form;
    // destructuring form state
    const { errors, isSubmitting, isValid } = formState;

    const onSubmit = (data) => {
        dispatch(createUser(data));
    }

    const onError = (errors) => {
        console.log(errors);
    }

    useEffect(() => {
        if (signUp.success) {
            dispatch(fetchUser({ username: getValues('username'), password: getValues('password') }))
        }
    }, [signUp.success, dispatch, getValues]);

    useEffect(() => {
        if (user.loggedIn) {
            reset();
            navigate('/');
        }
    }, [user.loggedIn, navigate, reset]);

    useEffect(() => {
        return () => {
            dispatch(resetSignupState());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div className={styles.signUp_main}>
                <div className={styles.signUp_container}>
                    <div className={styles.singUp_logo}>
                        <NavLink to='/' title="Go to Homepage" id="logo">
                            <h2>AWESOME <span className="highlight">RECIPES</span></h2>
                        </NavLink>
                    </div>
                    <div className={styles.signUp_header}>
                        <h2>Create your account</h2>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit, onError)} className={styles.signUp_form} noValidate>

                        <div className={`${styles.firstname} ${styles.slot}`}>
                            <label htmlFor="firstname">Firstname</label>
                            <input type="text" id="firstname" placeholder='Enter your firstname' {...register('firstname')} />
                            {errors.firstname && <p className={styles.error}>*{errors.firstname.message}</p>}
                        </div>

                        <div className={`${styles.lastname} ${styles.slot}`}>
                            <label htmlFor="lastname">Lastname</label>
                            <input type="text" id="lastname" placeholder='Enter your lastname' {...register('lastname')} />
                            {errors.lastname && <p className={styles.error}>*{errors.lastname.message}</p>}
                        </div>

                        <div className={`${styles.username} ${styles.slot}`}>
                            <label htmlFor="username">Username</label>
                            <input type="text" id="username" placeholder='Enter your username' {...register('username')} />
                            {errors.username && <p className={styles.error}>*{errors.username.message}</p>}
                        </div>

                        <div className={`${styles.password} ${styles.slot}`}>
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" placeholder='Enter your password' {...register('password')} />
                            {errors.password && <p className={styles.error}>*{errors.password.message}</p>}
                        </div>

                        <div className={`${styles.confirmPassword} ${styles.slot}`}>
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input type="password" id="confirmPassword" {...register('confirmPassword')} />
                            {errors.confirmPassword && <p className={styles.error}>*{errors.confirmPassword.message}</p>}
                        </div>
                        {signUp.error && <p className={`${styles.signUpError} ${styles.error}`}>*{signUp.error}</p>}
                        <p className={styles.rules}>*Username & Password must be 6 characters without containing special characters</p>
                        {isSubmitting || user.loading || signUp.loading ? <ReactLoading type={'spin'} color={'#ffdf00'} height={'2rem'} width={'2.5rem'} className={styles.loading} /> : (
                            <Button title='SIGN UP' disabled={!isValid} className={styles.btn} />
                        )}
                    </form>
                </div>
            </div>
        </>
    )
}
