import React from 'react';
import {Link} from 'react-router-dom';
import Logo from '../dog.png'

export default function LandingPage() {
    return(
        <div>
            <h1>Bienvenidos al Mundo Perruno</h1>
            <Link to ='/home'>
                <h4>Ingresar</h4>
                <img src={Logo} alt="img not found"/>
            </Link>

        </div>
    )
}