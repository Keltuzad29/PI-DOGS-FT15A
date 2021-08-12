import React from 'react';


export default function DogCard({name, img, temperament}) {
   // console.log("dogCard",temperament)
    return(
        <div>
            <img src={img} alt="img not found" width="200px" height="250px"/>
            <h3>{name}</h3>
            <h5>{temperament}</h5>
            

        </div>
    )    
}