import React from 'react';
import './whyHere.css';

import SectionTitle from '../../../components/sectionTitle/SectionTitle';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBowlFood, faList, faKitchenSet, faBasketShopping  } from "@fortawesome/free-solid-svg-icons"; 


export default function WhyHere() {
  return (
    <>
        <div className="whyHear_container">
            <SectionTitle titleName="Why Find Recipes Here?" />
            <div className="reasonsContainer">
                <div className="reason"> 
                    <FontAwesomeIcon icon={faBowlFood} size='xl' color='#ffcc00' />
                    <h3>Plenty Of Recipes</h3>
                    <h4>There are so many recipes in this site, waiting to be explored. Make sure to check out our daily recomendation.</h4>
                </div>
                <div className="reason"> 
                    <FontAwesomeIcon icon={faList} size='xl' color='#ffcc00' />
                    <h3>Many Categories</h3>
                    <h4>If you find it hard to choose, we have different categories ready to perfectly sort only what you want.</h4>
                </div>
                <div className="reason"> 
                    <FontAwesomeIcon icon={faBasketShopping} size='xl' color='#ffcc00' />
                    <h3>Buit-In Shopping List</h3>
                    <h4>Too lazy to note down your ingredients? Worry not! We have a shopping list which buit in your account</h4>
                </div>
                <div className="reason"> 
                    <FontAwesomeIcon icon={faKitchenSet} size='xl' color='#ffcc00' />
                    <h3>Create Your Own Recipes</h3>
                    <h4>Be both receiver and giver! Here You can create your own recipes and become a respectable chief.</h4>
                </div>
            </div>
        </div>
    </>
  )
}
