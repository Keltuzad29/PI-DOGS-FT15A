import React from 'react';


export default function DogCard({name, img, temperaments}) {
   // console.log("dogCard",temperament)
    return(
        <div>
            <img src={img} alt="img not found" width="200px" height="250px"/>
            <h3>{name}</h3>
            <h5>{temperaments}</h5>
            

        </div>
    )    
}