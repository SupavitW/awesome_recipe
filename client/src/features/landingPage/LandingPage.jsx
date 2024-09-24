import React from 'react';
import './landingPage.css';

import Hero from './hero/Hero'
import WhyHere from './whyHere/WhyHere';
import PopularCategories from './popularCategories/PopularCategories';
import TodayRecipes from './todayRecipes/TodayRecipes';
import CreateAccount from './createAccount/CreateAccount';


export default function LandingPage() {
  return (
    <>  
        <section>
          <Hero/>
        </section>
        <section>
          <WhyHere/>
        </section>
        <section>
          <TodayRecipes/>
        </section>
        <section>
          <PopularCategories/>
        </section>
        <section>
          <CreateAccount/>
        </section>
    </>
  )
}
