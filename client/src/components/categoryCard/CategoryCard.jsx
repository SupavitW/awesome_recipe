import React from 'react'
import { useNavigate } from 'react-router-dom'
import { getRecipesByCategory } from '../../slices/recipes/recipesAPI';
import styles from './CategoryCard.module.css'

export default function CategoryCard({imgSrc, title}) {
    const navigate = useNavigate();
    const query = {
        category: title 
    };
    const queryString = new URLSearchParams(query).toString();

    const handleClicked = () => {
        navigate(`/recipes/search?title=&${queryString}`);
        //dispatch(getRecipesByCategory(title));
    }
    return (
        <>
            <div className={styles.categoryCard}>
                <div className={styles.img_container}>
                    <img src={imgSrc} alt={title}/>
                </div>
                <h3 className={styles.categoryTitle}>{title}</h3>
                <button className={styles.button} onClick={handleClicked}>SEE ALL</button>
            </div>

        </>
    )
}