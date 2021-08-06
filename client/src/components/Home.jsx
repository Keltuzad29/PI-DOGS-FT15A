import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs } from "../actions";
import {Link} from 'react-router-dom';
import DogCard from "./DogCard";

export default function Home(){

    const dispatch = useDispatch()
    const allDogs = useSelector((state)=> state.dogs)
    const [currentPage, setCurrentPage] = useState(1)
    const [dogsPerPage, setCharactersPerPage] = useState(9)

    useEffect (()=>{
        dispatch(getDogs());
    }, [])

    function handleClick(e){
        e.preventDefault();
        dispatch(getDogs());
    }

    return (
        <div>
            <Link to= '/dogs'>Crear Personaje</Link>
            <h1>MUNDO PERRUNO</h1>
            <button onClick={e=> {handleClick(e)}}>
                Volver a Cargar Todos los Perros
            </button>
            <div>
                <select>
                    <option value='asc'>Ascendente</option>
                    <option value='desc'>Descendente</option>
                    <option value='weightasd'>Weight ↑</option>
                    <option value='weightdesc'>Weight ↓</option>
                    
                </select>
                <select >Temperamentos</select>
                <select>
                    <option value='All'>Todos</option>
                    <option value='created'>Creados</option>
                    <option value='api'>Existente</option>
                </select>
                {allDogs?.map( el =>{
               return (
               <DogCard img={el.img} name={el.name} temperaments={el.temperaments} key={el.id}/>
                    )
                })}
            </div>
        </div>
    )
}