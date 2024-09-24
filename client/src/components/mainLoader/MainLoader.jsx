import React from 'react'
import ReactLoading from 'react-loading';
import styles from './MainLoader.module.css';

export default function MainLoader() {
    return (
        <div className={styles.loaderContainer}>
            <div className={styles.loaderBox}>
                <h2>Loading...</h2>
                <ReactLoading type={'spin'} color={'#ffdf00'} width={'3rem'} />
            </div>
        </div>
    )
}
