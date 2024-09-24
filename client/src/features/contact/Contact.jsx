import React from 'react';
import style from './Contact.module.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faMailBulk  } from "@fortawesome/free-solid-svg-icons"; 

export default function Contact() {
    return (
        <>
            <div className={style.backGround}>
                <div className={style.container}>
                    <h2>Contact <span className={style.yellow}>US</span></h2>
                    <div className={style.element_container}>
                        <div className={style.element}>
                            <FontAwesomeIcon icon={faPhone} size='xl' color='#ffcc00' />
                            <h3>Phone</h3>
                            <p>091-065-5556</p>
                        </div>
                        <div className={style.element}>
                            <FontAwesomeIcon icon={faMailBulk} size='xl' color='#ffcc00' />
                            <h3>Email</h3>
                            <p>sdpoom544@gmail.com</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}