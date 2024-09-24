import React, { useRef } from 'react'
import { useNavigate, createSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { searchRecipes } from '../../../slices/recipes/recipesAPI';

import './hero.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// <FontAwesomeIcon icon="fa-duotone fa-magnifying-glass" />
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"; 

export default function Hero() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const searchInput = useRef(null);

    const handleSearch = () => {
        if (!searchInput.current.value) return;
        const query = {
            title: searchInput.current.value,
            category: ''
        }
        const queryString = createSearchParams(query);
        navigate({
            pathname: '/recipes/search',
            search: `?${queryString}`
        });
        dispatch(searchRecipes(queryString));
    }

  return (
    <>
        <div className="landingPage_hero_hero-container">
            <div className="landingPage_hero_card-container">
                <div className="landingPage_hero_card-text">
                    <h1>
                        Best Recipes <br/> 
                        for your <span className='highlight'>Meals</span>
                    </h1>
                    <div className="landingPage_hero_line"/>
                    <h2>Unlock a world of variety culinary recipes  <br/> and
                    discover the perfect tastes from your imagination</h2>
                </div>
                <div className="landingPage_hero_searchbox">
                        <div className="icon">
                            <FontAwesomeIcon icon={faMagnifyingGlass}/>
                        </div>
                        <input className='landingPage_hero_searchbar' type="text" placeholder='Enter a recipe name' ref={searchInput} />
                        <button  className='landingPage_hero_searchbutton' onClick={handleSearch}>Search</button>
                </div>
            </div>
            <div className="landingPage_hero_img-container">
                <img src={require('../../../assets/hero_img.png')} alt='a plate filled with salmon salad' />
            </div>
        </div>
    </>
  )
}
