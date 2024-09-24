import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import RecipeCard from '../../../components/recipeCard/RecipeCard';
import { searchRecipes } from '../../../slices/recipes/recipesAPI';
import ReactLoading from 'react-loading';
import styles from './SearchRecipes.module.css';

export default function SearchRecipes() {
    const recipes = useSelector((state) => state.recipes);
    const dispatch = useDispatch();
    const { search } = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(search);
        if (params) {
            dispatch(searchRecipes(params));
        }
    }, [search, dispatch]);

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