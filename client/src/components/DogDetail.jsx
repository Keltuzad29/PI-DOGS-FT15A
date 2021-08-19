import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link} from "react-router-dom";
import { getDetail } from "../actions";
import s from '../styles/DogDetail.module.css';


export default function Detail (props){
    console.log(props)

const dispatch = useDispatch()


useEffect(() => {
    dispatch(getDetail(props.match.params.id));
}, [dispatch])

const myDog = useSelector((state)=> state.detail)

    
return (
    <div className={s.margin}>
        {myDog.length > 0 ? 
        <div >
            <h1 className={s.title}>{myDog[0].name}</h1>
            <div className={s.contenedor}>
                <img className={s.dogImage} src={myDog[0].img ? myDog[0].img : "https://www.anipedia.net/imagenes/nombres-de-perros-800x375.jpg"} alt=""/>
            <div className={s.text}>
            <div className={s.tamaño}> 
                <h2 >Tamaño: </h2>
                <p> {myDog[0].height_min}  -  </p>
                <p>{myDog[0].height_max}  Centimetros</p>
            </div>
            <div className={s.peso}>
            <h2>Peso: </h2>
                <p> {myDog[0].weight_min}  -  </p>
                <p>{myDog[0].weight_max}  Kilogramos</p>
            </div>
            <div className={s.vida}>
            <h2 >Tiempo de Vida: </h2>
                <p> {myDog[0].life_time_min}  -  </p>
                <p>{myDog[0].life_time_max}  Años</p>
            </div>
            <div className={s.vida}>
            <h2 >Origen: </h2>
                <p> {myDog[0].origin ? myDog[0].origin : "🐶 No Sabemos de Donde Proviene 😭"}</p>
            </div>
            <h2 >Temperamentos: </h2>
            <p>{!myDog[0].createInDb ? myDog[0].temperament : myDog[0].Temperaments.map(e=>e.name + " ")}</p>
        </div> </div>  </div>
            : <img src="https://media.giphy.com/media/2RCQ345oLZSVi/giphy.gif" alt="" /> }
    <Link to= '/home'><button className={s.boton}>Volver</button></Link>
    </div>
)

}