import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import {getNameDogs} from '../actions';


export default function SearchBar(){
    const dispatch = useDispatch()
    const [name, setName] = useState("")

    function handleInputChange(e){
        e.preventDefault();
        setName(e.target.value)
        console.log(name)
    }

    function handleSubmit(e){
        e.preventDefault();
        if(name !== ""){
        dispatch(getNameDogs(name));
        setName("");}
        else{
        alert("Ingresa un nombre para buscar")
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
            <input 
            type="text"
            placeholder="Buscar Perrito..."
            onChange= {handleInputChange}
            value={name}
            />
            <button type='submit' onClick={handleSubmit}>Buscar Perrito</button>
            </form>
        </div>
    )
}
