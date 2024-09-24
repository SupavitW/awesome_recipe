import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import styles from './RecipePage.module.css';

import { getRecipeByID } from '../../slices/recipes/recipesAPI';
import { getFavRecipes, addToFav, removeFromFav } from '../../slices/favoriteRecipes/favoriteRecipesAPI';
import { resetFavoriteRecipesState } from '../../slices/favoriteRecipes/favoriteRecipesSlice';
import { addToShoppingList, addAllToShoppingList} from '../../slices/shoppingList/shoppingListAPI';
import MainLoader from '../../components/mainLoader/MainLoader';
import SectionTitle from '../../components/sectionTitle/SectionTitle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faHeart, faDeleteLeft, faCartShopping } from '@fortawesome/free-solid-svg-icons';

export default function RecipePage() {
    const { recipeID } = useParams(); // Access the recipe ID params from the URL
    const { favList } = useSelector((state) => state.favoriteRecipes);
    const [popUpSuccess, setPopUpSuccess] = useState(false);
    const [popUpFail, setPopUpFail] = useState(false);
    const user = useSelector((state) => state.user);
    const recipes = useSelector((state) => state.recipes);
    const recipe = useSelector((state) => state.recipes.recipesArray[0]);
    const dispatch = useDispatch();

    //get user favorite recipes for checking whether the recipe is already in the favorite list
    useEffect(() => {
        if (user.loggedIn) dispatch(getFavRecipes());
    }, [dispatch, user.loggedIn]);
    
    // Check if the recipe in the favorite list
    // Initialize isFav state
    const [isFav, setIsFav] = useState(false);

    // Update isFav when favList changes
    useEffect(() => {
        // Ensure favList is an array before calling .some
        if (Array.isArray(favList)) {
            setIsFav(favList.some(favRecipe =>
                String(favRecipe.id) === String(recipeID)
            ));
        } else {
            // Handle the case where favList is not an array (e.g., undefined or null)
            setIsFav(false);
        }
    }, [favList, recipeID]);
    
    useEffect(() => {
        return () => {
            dispatch(resetFavoriteRecipesState());
        }
    }, [dispatch]);
    
    useEffect(() => {
        dispatch(getRecipeByID(recipeID));
    }, [recipeID, dispatch]);
    
    // Toggle favorite status
    const toggleFavorite = async () => {
        if (isFav) {
            // If currently a favorite, remove from favorites
            await dispatch(removeFromFav(recipeID));
        } else {
            // If not currently a favorite, add to favorites
            await dispatch(addToFav(recipeID));
        }
        dispatch(getFavRecipes());
    };

    const handleAddToShoppingList = async (ingredientInfo) => {
        try {
            // Assuming addToShoppingList returns a promise with the response status
            const response = await dispatch(addToShoppingList(ingredientInfo));
            if (response.error && response.error.message) {
                setPopUpFail(true);
            } else {
                setPopUpSuccess(true);
            }

        } catch (error) {
            console.error("Error adding to shopping list", error);
            // Optionally, set popUpFail to true here if you want to show a failure message for any error
        }
    };

    const handleAddAllToShoppingList = (recipeID) => {
        dispatch(addAllToShoppingList(recipeID));
        setPopUpSuccess(true);
    }
    
    const handlePopUpSucessBtn = (e) => {
        setPopUpSuccess(false);
    }

    const handlePopUpFailBtn = (e) => {
        setPopUpFail(false);
    }

    return (
        <>
            {recipes.loading || !recipe ? <MainLoader /> : (
                <div className={styles.recipeContainer}>
                    <div className={styles.recipe_header}>
                        <div className={styles.flex}>
                            <SectionTitle titleName={recipe.title} />
                            {user.loggedIn ?
                                <button className={isFav ? styles.unFavBtn : styles.favBtn} onClick={toggleFavorite}>
                                    {isFav ?
                                        <span>Remove from Favorite &nbsp; <FontAwesomeIcon icon={faDeleteLeft} /></span>
                                        : <span>Add to Favorite &nbsp;<FontAwesomeIcon icon={faHeart} /></span>}
                                </button> : null}
                        </div>
                        <div className={styles.recipe_category}>
                            <p>{recipe.category}</p>
                        </div>
                        <div className={styles.recipe_creator}>
                            <p>By &nbsp;<span>{recipe.user.firstname} {recipe.user.lastname}</span></p>
                        </div>
                    </div>
                    <div className={styles.recipe_preparationTime}>
                        <p>Cook Time  : &nbsp; {recipe.preparation_time}</p>
                        <FontAwesomeIcon icon={faClock} color='#ffcc00' />
                    </div>
                    <div className={styles.recipe_description}>
                        <p>{recipe.description}</p>
                    </div>
                    <div className={styles.recipeImageContainer}>
                        <img src={recipe.recipe_pic.imageType === 'image/jpeg' ? `data:image/jpeg;base64, ${recipe.recipe_pic.imageData}`
                            : `data:image/png;base64, ${recipe.recipe_pic.imageData}`} alt={`${recipe.title}`} />
                    </div>
                    <div className={styles.recipe_ingredients}>
                        <div className={styles.flexIngrdients}>
                            <h2>Ingredients</h2>
                            {user.loggedIn ? <button className={styles.addAllIngredientsBtn} onClick={() => handleAddAllToShoppingList(recipeID)}>Add All to Shopping List &nbsp; <FontAwesomeIcon icon={faCartShopping} /></button> : null}
                        </div>
                        <ul>
                            {recipe.ingredients && recipe.ingredients.map((ingredient) => (
                                <li key={ingredient.id}>
                                    <div className={styles.sideBySide}>
                                        {ingredient.title} &nbsp; {ingredient.measurements.quantity} &nbsp; {ingredient.measurements.unit}
                                        {user.loggedIn ? <button className={styles.addIngredientBtn} onClick={() => handleAddToShoppingList({ id: ingredient.id, unit: ingredient.measurements.unit, quantity: ingredient.measurements.quantity })}>Add to Shopping List</button> : null}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    { popUpSuccess && (
                        <div className={styles.popUpSuccess}>
                            <p>Added the ingredients to your shoppingList</p>
                            <div className={styles.flex}>
                                <button className={styles.okBtn} onClick={() => {handlePopUpSucessBtn()}}>OK</button>
                            </div>
                        </div>
                    )}
                    { popUpFail && (
                        <div className={styles.popUpFail}>
                            <p>The ingredients are already in your shoppingList</p>
                            <div className={styles.flex}>
                                <button className={styles.okBtn} onClick={() => {handlePopUpFailBtn()}}>OK</button>
                            </div>
                        </div>
                    )}
                    <div className={styles.recipe_instruction}>
                        <h2>Instructions</h2>
                        <ul>
                            {recipe.instructions && recipe.instructions.map((instruction, index) => (
                                <li key={index}>{instruction}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </>
    );
}
