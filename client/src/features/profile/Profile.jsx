import React, { useState } from 'react';
import styles from './Profile.module.css';

//import tab components
import UserTab from './userTab/UserTab';
import FavoriteRecipesTab from './favRecipesTab/FavRecipesTab';
import MyRecipesTab from './myRecipesTab/MyRecipesTab';
import ShoppingListTab from './shoppingListTab/ShoppingListTab';

export default function Profile() {
  const [activeTab, setActiveTab] = useState('profile');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className={styles.profileBackground}>
      <div className={styles.profileContainer}>
        <div className={styles.sideButtonsContainer}>
          <button
            className={activeTab === 'profile' ? styles.activeButton : styles.inactiveButton}
            onClick={() => handleTabChange('profile')}
          >
            Profile
          </button>

          <button
            className={activeTab === 'shoppingList' ? styles.activeButton : styles.inactiveButton}
            onClick={() => handleTabChange('shoppingList')}
          >
            Shopping List
          </button>

          <button
            className={activeTab === 'myRecipes' ? styles.activeButton : styles.inactiveButton}
            onClick={() => handleTabChange('myRecipes')}
          >
            My Recipes
          </button>

          <button
            className={activeTab === 'favoriteRecipes' ? styles.activeButton : styles.inactiveButton}
            onClick={() => handleTabChange('favoriteRecipes')}
          >
            Favorite Recipes
          </button>
        </div>

        <div className={styles.tabContent}>
          {activeTab === 'shoppingList' && <ShoppingListTab />}
          {activeTab === 'favoriteRecipes' && <FavoriteRecipesTab />}
          {activeTab === 'myRecipes' && <MyRecipesTab />}
          {activeTab === 'profile' && <UserTab />}
        </div>
      </div>
    </div>
  );
}


