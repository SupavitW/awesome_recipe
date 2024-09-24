import React from 'react';
import { Link } from 'react-router-dom';
import './todayRecipes.css';
import SectionTitle from '../../../components/sectionTitle/SectionTitle';
import RecipeCard from '../../../components/recipeCard/RecipeCard';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";

export default function TodayRecipe() {
  return (
    <>
      <div className="todayRecipes_container">
        <div className="todayRecipes_header">
          <SectionTitle titleName="Today's Recipes" />
        </div>

        <div className="todayRecipes_card-Containers">
          <RecipeCard title="Tom Yam Kung"
            imgSrc={require('../../../assets/tom-yum-soup_img.jpg')}
            cookTime={'1 hour'}
            creator={'Supavit'}
            featured={true}
            recipeID={1} 
            recipeLink={'/recipe/1'}/>
          <div className='utensilsIcon'>
            <FontAwesomeIcon icon={faUtensils} size='xl' color={'#ffcc00'} />
          </div>
          <RecipeCard title="Thai Green Curry"
            imgSrc={require('../../../assets/thai-green-curry_img.jpg')}
            cookTime={'1.5 hour'}
            creator={'Wirot'}
            featured={true}
            recipeID={10} 
            recipeLink={'/recipe/10'}/>
        </div>
        <div className='more-categories'>
                <div className="landingPage_more-recipes_line"/>
                <h3 style={{fontWeight: 'normal'}}>See All Recipes</h3> 
                <Link to='/recipes' className='more-categories-link' >
                    Click
                </Link> 
            </div>
      </div>

    </>
  )
}
