import React, { useRef } from 'react';
import styles from './RecipesPage.module.css';
import SectionTitle from '../../components/sectionTitle/SectionTitle';

import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, createSearchParams, Outlet, useLocation } from 'react-router-dom';
import { getAllRecipes } from '../../slices/recipes/recipesAPI';
import { searchRecipes } from '../../slices/recipes/recipesAPI';
import { resetRecipesState } from '../../slices/recipes/recipesSlice';
import { useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export default function RecipesPage() {
    const recipes = useSelector((state) => state.recipes);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const searchInput = useRef(null);
    const categortyInput = useRef(null);

    const onSearch = () => {
        // create a query object
        const query = {
            title: searchInput.current.value,
            category: categortyInput.current.value
        };

        // use createSearchParams to create a query string
        const queryString = createSearchParams(query);

        // navigate to search page with query string
        navigate({
            pathname: '/recipes/search',
            // add query serach parameter so the URL will be intact
            search: `?${queryString}`
        });
        // dispatch searchRecipes action to search recipes on the server
        dispatch(searchRecipes(queryString));
    }

    useEffect(() => {
        // Only fetch all recipes if there is no search query
        if (!location.search) dispatch(getAllRecipes());
    }, [dispatch, location.search]);

    useEffect(() => {
        return () => {
            dispatch(resetRecipesState());
        }
    }, [dispatch]);

    return (
        <>
            <div className={styles.recipesPage_banner}>
                <div className={styles.header}>
                    <SectionTitle titleName="All Recipes" />
                </div>
                <div className={styles.flex_container}>
                    <div className={styles.searchBar_container}>
                        <input type="text" placeholder="Search for recipes" className={styles.searchBar} ref={searchInput} />
                        <button className={styles.searchButton} onClick={onSearch}>
                            SEARCH
                            <FontAwesomeIcon icon={faMagnifyingGlass} size='lg' />
                        </button>
                    </div>
                    <div className={styles.selectCategory_container}>
                        <label style={{ fontSize: "1rem" }}>Select the category : </label>
                        <select name="category" id="category" defaultValue="" className={styles.selectCategory} ref={categortyInput}>
                            <option value="">All</option>
                            <option value="breakfast">Breakfast</option>
                            <option value="lunch">Lunch</option>
                            <option value="dinner">Dinner</option>
                            <option value="dessert">Dessert</option>
                            <option value="snacks">Snacks</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className={styles.recipeCards_container}>
                <Outlet />
            </div>
        </>
    )
}
