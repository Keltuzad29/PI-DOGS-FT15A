import React from "react";
import s from '../styles/Error404.module.css'
import { Link } from "react-router-dom";
import video from '../video.mp4'

export const Error404 = () => {
    return (
        <div>
            <h3 className={s.title} >Error 404</h3>
            <p className={s.subTitle}>Pagina no Encontrada</p>
            <div >
            <video width="500" height="300" controls>
    <source src={video} type="video/mp4"/>
</video>      
        
            {/* <iframe width="500" height="300" src="https://www.youtube.com/embed/DUfixfRa1_g" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen autoplay></iframe>  */}
          </div>


       
            <Link to= '/home'><button className={s.boton} >Home</button></Link>
        </div>
    )
}

export default Error404;