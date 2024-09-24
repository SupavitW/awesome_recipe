import React, { useEffect } from 'react';
import styles from './FavRecipesTab.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { getFavRecipes } from '../../../slices/favoriteRecipes/favoriteRecipesAPI';
import { useNavigate } from 'react-router-dom';

export default function FavRecipesTab() {
    const { favList } = useSelector(state => state.favoriteRecipes);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick = (e) => {
        const recipeTitle = e.target.textContent;
        const recipe = favList.find(recipe => recipe.title === recipeTitle);
        navigate(`/recipe/${recipe.id}`);
    }

    useEffect(() => {
        dispatch(getFavRecipes());
    }, [dispatch]);

    return (
        <>
            <div className={styles.favRecipesTabContainer}>
                <div className={styles.favRecipesTabHeader}>
                    <h2>Favorite Recipes</h2>
                </div>
                <div className={styles.favRecipesTabContent}>
                    {favList.length > 0 ? (
                        favList.map(recipe => (
                            <button key={recipe.id} onClick={handleClick}>{recipe.title}</button>
                        ))
                    ) : (
                        <p>No favorite recipes yet</p>
                    )}
                </div>
            </div>
        </>
    );
}