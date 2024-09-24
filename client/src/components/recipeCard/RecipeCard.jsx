import React, {useCallback} from 'react';
import { useNavigate } from 'react-router-dom';
import './recipeCard.css';
import Button from '../button/Button';

export default function RecipeCard({title, imgSrc, cookTime, creator, recipeLink, recipeID, featured=false}) {
  const truncatedTitle = title.substring(0, 25);
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate(recipeLink);
   
  }, [navigate, recipeLink]);
  
  return (
    <>
      <div className="card">
        <div className='yellow_header'/>
        <div className="card_img-container">
          {featured ? <img src={imgSrc} alt={`${title}`} /> : <img src={`${imgSrc}`} alt={`${title}`} /> } 
        </div>
        <div className="card_title">
          <h3>{truncatedTitle}</h3>
        </div>
        <div className="card_description">
          <h4>Cook Time: {cookTime}</h4>
          <h4>Created By: <span>{creator}</span></h4>
        </div>
        <div className="card_btn">
          <Button title='SEE RECIPE' onClick={handleClick} />
        </div>
      </div>
    </>
  )
}
