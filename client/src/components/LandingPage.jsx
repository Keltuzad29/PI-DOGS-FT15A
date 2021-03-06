import React from 'react';
import {NavLink} from 'react-router-dom';
import Logo from '../dog.png'
import s from '../styles/LandingPage.module.css'

export default function LandingPage() {
    return(
        <div>
            <h1 className={s.title}>Bienvenidos al Mundo Perruno</h1>
            <NavLink className={s.navlink} to ='/home'>
                <h4 className={s.subTitle}>Ingresar</h4>
                <img src={Logo} alt="img not found"/>
            </NavLink>

        </div>
    )
}