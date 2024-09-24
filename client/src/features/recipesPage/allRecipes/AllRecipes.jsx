import React from 'react'

import { useSelector } from 'react-redux';
import RecipeCard from '../../../components/recipeCard/RecipeCard';
import ReactLoading from 'react-loading';
import styles from './AllRecipes.module.css';

export default function AllRecipes() {
    const recipes = useSelector((state) => state.recipes);

    return (
        <>
            {/* // display loading component if the recipes state is pending */}
            {recipes.loading ? (
                <div className={styles.loaderContainer}>
                    <div className={styles.loaderBox}>
                        <h2>Loading...</h2>
                        <ReactLoading type={'spin'} color={'#ffdf00'} width={'3rem'} />
                    </div>
                </div>) : (
                recipes.recipesArray.map((recipe) => (
                    <RecipeCard
                        key={recipe.id}
                        title={recipe.title}
                        cookTime={recipe.preparation_time}
                        creator={recipe.user.firstname}
                        imgSrc={recipe.recipe_pic.imageType === 'image/jpeg' ? `data:image/jpeg;base64, ${recipe.recipe_pic.imageData}`
                            : `data:image/png;base64, ${recipe.recipe_pic.imageData}`}
                        recipeLink={`/recipe/${recipe.id}`}
                        recipeID={recipe.id}
                    />
                ))
            )
            }
        </>
    )
}
