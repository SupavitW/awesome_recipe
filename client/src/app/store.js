import { configureStore, combineReducers } from "@reduxjs/toolkit";
import recipesReducer from '../slices/recipes/recipesSlice';
import createRecipeReducer from '../slices/createRecipe/createRecipeSlice';
import userReducer from '../slices/user/userSlice';
import signUpReducer from "../slices/signUp/signUpSlice";
import favoriteRecipesReducer from "../slices/favoriteRecipes/favoriteRecipesSlice";
import myRecipesReducer from '../slices/myRecipes/myRecipesSlice';
import editRecipeReducer from '../slices/editRecipe/editRecipeSlice';
import shoppingListReducer from '../slices/shoppingList/shoppingListSlice';

import storage from 'redux-persist/lib/storage';
import {  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,  } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import { editRecipe } from "../slices/editRecipe/editRecipeAPI";

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
};

const rootReducer = combineReducers({
  recipes: recipesReducer,
  createRecipe: createRecipeReducer,
  user: userReducer,
  myRecipes: myRecipesReducer,
  signUp: signUpReducer,
  favoriteRecipes: favoriteRecipesReducer,
  editRecipe: editRecipeReducer,
  shoppingList: shoppingListReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  })
});

const persistor = persistStore(store);

export { store, persistor };





