import React from 'react';
import {Link} from 'react-router-dom';
import Logo from '../dog.png'
import s from './LandingPage.module.css'

export default function LandingPage() {
    return(
        <div>
            <h1 className={s.title}>Bienvenidos al Mundo Perruno</h1>
            <Link to ='/home'>
                <h4 className={s.subTitle}>Ingresar</h4>
                <img src={Logo} alt="img not found"/>
            </Link>

        </div>
    )
}