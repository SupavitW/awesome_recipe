import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import ReactLoading from 'react-loading';
import styles from './EditForm.module.css';

import Button from '../../../components/button/Button';
import { editProfile } from "../../../slices/user/userAPI";
import { resetUpdateSuccessful, resetError } from '../../../slices/user/userSlice';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import editProfileSchema from '../../../validation/editProfile/editProfileValidation';
import { yupResolver } from '@hookform/resolvers/yup';

export default function EditForm({ option }) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const updateSuccessful = useSelector(state => state.user.updateSuccessful);
    const form = useForm({
        defaultValues: {
            firstname: '',
            lastname: '',
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
            formType: option
        },
        mode: 'onBlur', //customize form validation mode
        resolver: yupResolver(editProfileSchema)
    });

    // destructuring form methods
    const { register, handleSubmit, formState, reset } = form;
    const { errors, isSubmitting, isSubmitSuccessful, isValid } = formState;


    const onSubmit = (data) => {
        if (option === 'name') {
            dispatch(editProfile({ 'userInput': { ...data, formType: 'name' }, 'option': 'name' }))
        } else {
            dispatch(editProfile({ 'userInput': { ...data, formType: 'password' }, 'option': 'password' }))
        }
    }

    const onError = (errors) => {
        console.log(errors);
    }
    // clean up effect
    useEffect(() => {
        return () => {
            // These will be called when the component is unmounted
            dispatch(resetUpdateSuccessful());
            dispatch(resetError());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
    }, [isSubmitSuccessful, reset]);

    return (
        <>
            <div className={styles.editFormContainer}>

                <div className={styles.edit_header}>
                    <h2>Edit {option === 'name' ? 'Name' : 'Password'} : </h2>
                </div>

                {option === 'name' ? (
                    <form onSubmit={handleSubmit(onSubmit, onError)} className={styles.editNameForm_form}>
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
                        {isSubmitting || user.loading ? <ReactLoading type={'spin'} color={'#ffdf00'} height={'2rem'} width={'2.5rem'} className={styles.loadingName} /> : (
                            <Button title='EDIT NAME' disabled={!isValid} className={styles.editName_btn} />
                        )}
                        {updateSuccessful && (
                            <div className={styles.successBannerName}>
                                <p>Your {option} has been updated!</p>
                                <FontAwesomeIcon icon={faSquareCheck} size="xl" />
                            </div>
                        )}
                        {user.error && <p className={`${styles.error} ${styles.editNameError}`}>*{user.error}</p>}
                    </form>
                ) : (
                    <form onSubmit={handleSubmit(onSubmit, onError)} className={styles.editPasswordForm_form}>
                        <div className={`${styles.oldPassword} ${styles.slot}`}>
                            <label htmlFor="oldPassword">Old Password</label>
                            <input type="password" id="oldPassword" placeholder='Enter your old password' {...register('oldPassword')} />
                            {errors.oldPassword && <p className={styles.error}>*{errors.oldPassword.message}</p>}
                        </div>
                        <div className={`${styles.newPassword} ${styles.slot}`}>
                            <label htmlFor="newPassword">New Password</label>
                            <input type="password" id="newPassword" placeholder='Enter your new password' {...register('newPassword')} />
                            {errors.newPassword && <p className={styles.error}>*{errors.newPassword.message}</p>}
                        </div>
                        <div className={`${styles.confirmPassword} ${styles.slot}`}>
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input type="password" id="confirmPassword" placeholder='Confirm your new password' {...register('confirmPassword')} />
                            {errors.confirmPassword && <p className={styles.error}>*{errors.confirmPassword.message}</p>}
                        </div>
                        {isSubmitting || user.loading ? <ReactLoading type={'spin'} color={'#ffdf00'} height={'2rem'} width={'2.5rem'} className={styles.loadingPW} /> : (
                            <Button title='CHANGE PASSWORD' disabled={!isValid} className={styles.editPW_btn} />
                        )}
                        {updateSuccessful && (
                            <div className={styles.successBannerPW}>
                                <p>Your {option} has been updated!</p>
                                <FontAwesomeIcon icon={faSquareCheck} size="xl" />
                            </div>
                        )}
                        {user.error && <p className={`${styles.error} ${styles.editPWError}`}>*{user.error}</p>}
                    </form>)}
            </div>
        </>
    )
}
