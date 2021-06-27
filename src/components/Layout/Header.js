import React from "react";

import headerStyles from './Header.module.css'
import MealsImage from '../../assets/meals.jpg'

import HeaderCartButton from "./HeaderCartButton";
const Header = () => {
    return (
        <React.Fragment>
            <header className={headerStyles.header}>
                <h1>ReactMeals</h1>
                <HeaderCartButton/>
            </header>
            <div className={headerStyles['main-image']}>
                <img src={MealsImage} alt="table of food"/>
            </div>
        </React.Fragment>
    )
}

export default Header