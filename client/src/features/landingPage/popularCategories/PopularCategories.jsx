import React from 'react'
import './popularCategories.css'
import SectionTitle from '../../../components//sectionTitle/SectionTitle';
import { Link, useNavigate } from 'react-router-dom';

import CategoryCard from '../../../components/categoryCard/CategoryCard';


export default function PopularCategories() {
  return (
    <>
        <div className="landingPage_popularCategories_container">
            <div className="landingPage_popularCategories_sectionTitle">
                <SectionTitle titleName='Recommended Categories'/>
            </div>
            <div className="landingPage_popularCategories_cardsContainer">
                <CategoryCard   
                    title='Lunch'
                    imgSrc= {require('../../../assets/lunch_img.png')}
                    />
                <CategoryCard
                    title='Dinner'
                    imgSrc= {require('../../../assets/dinner_img.png')}
                    />
                <CategoryCard
                    title='Dessert'
                    imgSrc= {require('../../../assets/dessert_img.png')}
                    />
            </div>
            <div className='more-categories'>
                <div className="landingPage_more-categories_line"/>
                <h3 style={{fontWeight: 'normal'}}>See All Categories</h3> 
                <Link to='/categories' className='more-categories-link' >
                    Click
                </Link> 
            </div>
        </div>
    </>
  )
}
