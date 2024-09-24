import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './MyRecipesTab.module.css';

import { getMyRecipes } from '../../../slices/myRecipes/myRecipesAPI';
import axiosInstance from '../../../utils/axios/axiosInstance';

export default function MyRecipesTab() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [popUp, setPopUp] = useState(false);
  const { myRecipes } = useSelector(state => state.myRecipes);

  const handleRecipeBtn = (e) => {
    const recipeTitle = e.target.textContent;
    const recipe = myRecipes.find(recipe => recipe.title === recipeTitle);
    navigate(`/recipe/${recipe.id}`);
  }

  const handleEditBtn = (e) => {
    const recipeId = e.target.getAttribute('recipeId');
    navigate(`/editRecipe/${recipeId}`);
  }

  const handleDeleteBtn = () => {
    setPopUp(true);
  }

  const handleConfirmBtn = async (recipe_id) => {
    const deleteRecipe = async () => {
      try {
        const targetURL = process.env.REACT_APP_BASE_URL + process.env.REACT_APP_SUB_URL_RECIPES + `/myRecipes/deleteRecipe/${recipe_id}`;
        const response = await axiosInstance.delete(targetURL, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        return response;
      } catch (error) {
        console.error("Failed to fetch recipe data", error);
      }
    };
    await deleteRecipe().then(() => {
      dispatch(getMyRecipes());
      setPopUp(false);
    })
  }

  const handleCancleBtn = (e) => {
    setPopUp(false);
  }

  useEffect(() => {
    dispatch(getMyRecipes());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className={styles.myRecipesTabContainer}>
        <div className={styles.myRecipesTabHeader}>
          <h2>My Recipes</h2>
        </div>
        <div className={styles.myRecipesTabContent}>
          {myRecipes.length > 0 ? (
            myRecipes.map(recipe => (
              <div className={styles.recipeDiv}>
                <button key={recipe.id} onClick={handleRecipeBtn} className={styles.recipeLink}>{recipe.title}</button>
                <button recipeid={recipe.id} className={styles.editBtn} onClick={handleEditBtn}>Edit</button>
                <button className={styles.deleteBtn} onClick={handleDeleteBtn}>Delete</button>
                {popUp && (
                  <div className={styles.popUp}>
                    <p>Are you sure you want to delete {recipe.title} recipe ?</p>
                    <div className={styles.flex}>
                      <button className={styles.yesBtn} onClick={() => { handleConfirmBtn(recipe.id) }}>Yes</button>
                      <button className={styles.noBtn} onClick={handleCancleBtn}>No</button>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>No recipes yet</p>
          )}
        </div>
      </div>
    </>
  )
}
