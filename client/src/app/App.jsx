import React from 'react';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

// import css module for App
import "./app.css";

// import store for axios interceptor
import { store } from './store';

// import helper functions
import { PublicRoute } from '../routing/PublicRoute';
import { ProtectedRoute } from '../routing/ProtectedRoute';
import axiosInterceptor from '../utils/axios/axiosInterceptor';

// import components for pages
import Root from '../components/root/Root';
import LandingPage from '../features/landingPage/LandingPage';
import Login from '../features/login/Login';
import SignUp from '../features/signUp/SignUp';
import Profile from '../features/profile/Profile';
import RecipesPage from '../features/recipesPage/RecipesPage';
import RecipePage from '../features/recipePage/RecipePage';
import AllRecipes from '../features/recipesPage/allRecipes/AllRecipes';
import SearchRecipes from '../features/recipesPage/searchRecipes/SearchRecipes';
import CreateRecipe from '../features/createRecipe/CreateRecipe';
import EditRecipe from '../features/editRecipe/EditRecipe';
import Categories from '../features/categories/Categories';
import About from '../features/about/About';
import Contact from '../features/contact/Contact';

// create Router
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Root />}>
        <Route index element={<LandingPage />} />
        <Route path="/profile" element={<ProtectedRoute> <Profile /> </ProtectedRoute>} />
        <Route path="/createRecipe" element={<ProtectedRoute> <CreateRecipe /> </ProtectedRoute>} />
        <Route path="/editRecipe/:recipeID" element={<ProtectedRoute> <EditRecipe /> </ProtectedRoute>} />
        <Route path="/recipes" element={<RecipesPage />}>
          <Route index element={<AllRecipes />} />
          <Route path="search" element={<SearchRecipes />} />
        </Route>
        <Route path="/categories" element={<Categories/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/recipe/:recipeID" element={<RecipePage />} />
        {/* <Route path="about" element={<div>About</div>} /> */}
      </Route>
      <Route path='/login' element={<PublicRoute><Login /></PublicRoute>} />
      <Route path='/signUp' element={<PublicRoute><SignUp /></PublicRoute>} />
    </>
  )
);

function App() {
  const navigate = router.navigate;
  // call axios interceptor
  axiosInterceptor(store, navigate);

  return (
    <RouterProvider router={router} />
  )
}

export default App;

