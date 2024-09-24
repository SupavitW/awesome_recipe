import React from 'react';
import style from './About.module.css';

export default function About () {
    return (
        <>
            <div className={style.sideBySide}>
                <div className={style.message_container}>
                    <h2>About <span className={style.yellow}>US</span></h2>
                    <div className={style.message}>
                        <p>Welcome to AWESOME Recipe, your all-in-one platform for food lovers and home cooks! Our mission is to make cooking easier, more enjoyable, and accessible for everyone.</p>
                        <p>With AWESOME Recipe, you can:</p>
                        <ul>
                            <li><span className={style.bold_yellow}>Create</span> your own personalized recipes with detailed instructions and ingredients.</li>
                            <li><span className={style.bold_yellow}>Edit</span> and customize existing recipes to fit your taste and dietary preferences.</li>
                            <li><span className={style.bold_yellow}>Discover</span> new and exciting recipes from our growing community of chefs and home cooks.</li>
                            <li><span className={style.bold_yellow}>Plan your shopping</span> new and exciting recipes from our growing community of chefs and home cooks.</li>
                        </ul>
                        <p>Whether you're an experienced chef or just starting out in the kitchen, AWESOME Recipe is designed to simplify meal planning and make cooking fun and convenient. Join us today and explore the joy of cooking with your own personal recipe assistant!</p>
                    </div>
                </div>
                <img alt='a notebook with some recipes on it' src={require('../../assets/about_img.jpg')}></img>
            </div>
        </>
    )
};