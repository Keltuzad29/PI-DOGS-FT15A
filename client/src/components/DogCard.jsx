import React from 'react';
import s from '../styles/DogCard.module.css'


export default function DogCard({name, img, temperaments}) {
   // console.log("dogCard",temperament)
    return(
        <div >
            <h3 className={s.subTitle}>{name}</h3>
            <img className={s.dogImage} src={img} alt="img not found" width="300" height="300px"/>
            <h5 className={s.temperament}>{temperaments}</h5>
        </div>
    )    
}
