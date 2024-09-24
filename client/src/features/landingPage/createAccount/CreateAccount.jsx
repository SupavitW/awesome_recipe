import React from 'react';
import { useNavigate  } from "react-router-dom";
import styles from './CreateAccount.module.css'; // Import CSS module
import { useSelector } from 'react-redux';

import SectionTitle from '../../../components/sectionTitle/SectionTitle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightLong } from '@fortawesome/free-solid-svg-icons';
import Button from '../../../components/button/Button';

export default function CreateAccount() {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);

    function handleLogin() {
        navigate('/login');
    }

    function handleSignUp() {
        navigate('/signUp');
    }

  return (
    <div className={styles.container}>
        <SectionTitle titleName={'Create Your Account For Full Features'}/>
        <div className={styles.content_container}>
            <div className= {styles.image_container}>
                <img src={require('../../../assets/cooking_img.jpg')} alt='a mother and two childs are cooking together' />
            </div>
            <div className={styles.benefits_container}>
                <div className={styles.iconAndHeading}>
                    <FontAwesomeIcon icon={faRightLong} size='xl' color={'#ffcc00'}/>
                    <h3>Create your recipes</h3>
                </div>
                <h4>You can create your own recipes after logging to your account. The recipes need the chief!</h4>
                <div className={styles.iconAndHeading}>
                    <FontAwesomeIcon icon={faRightLong} size='xl' color={'#ffcc00'}/>
                    <h3>Save your favorite recipes</h3>
                </div>
                <h4>Found any recipes and don't want to search them again? Save your favorites to your profile!</h4>
                <div className={styles.iconAndHeading}>
                    <FontAwesomeIcon icon={faRightLong} size='xl' color={'#ffcc00'}/>
                    <h3>Access to your shopping list</h3>
                </div>
                <h4>Of course, we know you have a lot of ingredients to prepare. We can help you with the buit-in shopping list.</h4>
            </div>
        </div>
        {!user.loggedIn &&  (
            <div className={styles.userButton}>
                <Button title={'LOGIN'} className={styles.btn} onClick={handleLogin} />
                <Button title={'SIGN UP'} className={styles.btn} onClick={handleSignUp} />
            </div>
        )}
    </div>
  );
}
