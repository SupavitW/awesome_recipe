import React from 'react';
import styles from './Button.module.css';

export default function Button({title, className, onClick, disabled}) {
  return (
    <>
        <button className={`${className} ${styles.normalButton}`}  disabled= {disabled} onClick={onClick}>{title}</button>
    </>
  )
}
