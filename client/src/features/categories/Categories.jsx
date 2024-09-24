import React from 'react';
import styles from './Categories.module.css';
import SectionTitle from '../../components/sectionTitle/SectionTitle';
import CategoryCard from '../../components/categoryCard/CategoryCard';

export default function Categories() {

    return (
        <>
            <div className={styles.categories_banner}>
                <div className={styles.header}>
                    <SectionTitle titleName="All Categories" />
                </div>
            </div>
            <div className={styles.categories_container}>
                <CategoryCard
                    title='Breakfast'
                    imgSrc={require('../../assets/breakfast_img.png')}
                />
                <CategoryCard
                    title='Lunch'
                    imgSrc={require('../../assets/lunch_img.png')}
                />
                <CategoryCard
                    title='Dinner'
                    imgSrc={require('../../assets/dinner_img.png')}
                />
                <CategoryCard
                    title='Dessert'
                    imgSrc={require('../../assets/dessert_img.png')}
                />
                <CategoryCard
                    title='Snacks'
                    imgSrc={require('../../assets/snacks_img.png')}
                />
            </div>
        </>
    );

};