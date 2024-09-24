import React, { useState } from 'react'
import styles from './UserTab.module.css'
import { useSelector } from 'react-redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import Button from '../../../components/button/Button'
import EditForm from './EditForm' // import your EditNameForm component


export default function UserTab() {
    const { profile, updateSuccessful } = useSelector(state => state.user)
    const [editMode, setEditMode] = useState('') // add a state variable for edit mode

    const handleEditClick = (mode) => {
        setEditMode(mode)
    }

    return (
        <>
            <div className={styles.userTabContainer}>
                <div className={styles.userTabHeader}>
                    <h2>User Profile</h2>
                </div>
                
                <div className={styles.userTabContent}>
                    {editMode === 'name' ? (
                        <EditForm option='name' /> // render the EditNameForm when editMode is 'name'
                    ) : editMode === 'password' ? (
                        <EditForm option = 'password' /> // render the EditPasswordForm when editMode is 'password'
                    ) : (
                        <div className={styles.profileInfo}> 
                            <ul>
                                <li>Firstname: {profile.firstname} </li>
                                <li>Lastname: {profile.lastname}</li>
                            </ul>
                        </div>
                    )}
                </div>
                <div className={styles.editProfileOptions}>
                    {editMode === 'name' || editMode === 'password' ? (
                        <Button title={updateSuccessful ? 'GO BACK' : 'CANCEL'} onClick={() => setEditMode('')} />
                    ) : (
                        <>
                            <Button title="EDIT NAME" onClick={() => handleEditClick('name')} />
                            <FontAwesomeIcon icon={faPenToSquare} size='xl' />
                            <Button title="EDIT PASSWORD" onClick={() => handleEditClick('password')} />
                        </>
                    )}
                </div>
            </div>
        </>
    )
}