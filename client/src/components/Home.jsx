import React from "react";
//importo los hook que voy a usar de react
import { useState, useEffect } from "react";
//importo los hooks de react-redux (previamente se instala npm i react-redux)
import { useDispatch, useSelector } from "react-redux";
//importo las actions que me interesa usar en este componente
import { getDogs, filterDogsByTemperaments, filterCreated, orderByName, orderByWeight, getTemperaments} from "../actions";
import {Link} from 'react-router-dom';
//importo los componentes que voy a usar
import DogCard from "./DogCard";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";

export default function Home(){

    const dispatch = useDispatch()
    const allDogs = useSelector((state)=> state.dogs)
    const [orden, setOrden]= useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [dogsPerPage, setDogsPerPage] = useState(9)
    const indexOfLastDog = currentPage * dogsPerPage // 1*9=9 2*9=18 3*9=27 4*9=36 5*9=45...
    const indexOfFirstDog = indexOfLastDog - dogsPerPage // 9-9=0 18-9=9 27-9=18 36-9=27 45-9=36...
    const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog)

    const temperaments = useSelector((state)=> state.temperaments)

    const paginado = (pageNumber)=>{
        setCurrentPage(pageNumber)
    }

    useEffect (()=>{
        dispatch(getDogs());
        dispatch(getTemperaments())
    }, [])


    function handleClick(e){
        e.preventDefault();
        dispatch(getDogs());
    }
    
    function handleFilterTemperament(e){   
        dispatch(filterDogsByTemperaments(e.target.value))
    }
    
    function handleFilterCreated(e){
        dispatch(filterCreated(e.target.value))
    }

    function handleSort(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    }

    function handleSortWeight(e){
        e.preventDefault();
        dispatch(orderByWeight(e.target.value))
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    }

    return (
        <div>
            <Link to= '/dogs'>Crear Personaje</Link>
            <h1>MUNDO PERRUNO</h1>
            <button onClick={e=> {handleClick(e)}}>
                Volver a Cargar Todos los Perros
            </button>
            <div>
                <select onChange={e=> handleSort(e)}>
                    <option value='asc'>Ascendente</option>
                    <option value='desc'>Descendente</option>   
                </select>

                <select onChange={e=> handleSortWeight(e)}>
                    <option value='weightasd'>Weight ↑</option>
                    <option value='weightdesc'>Weight ↓</option>   
                </select>
            
                <select onChange={e=> handleFilterTemperament(e)}>
                    {temperaments.map((temp)=>(
                        <option value={temp.name}  key={temp.id}>{temp.name}</option>
                    ))}
                </select>

                <select onChange={e=> handleFilterCreated(e)}>
                    <option value='All'>All</option>
                    <option value='created'>Creados</option>
                    <option value='api'>Existente</option>
                </select>

                <SearchBar/>
                <Paginado
                dogsPerPage= {dogsPerPage}
                allDogs= {allDogs.length}
                paginado= {paginado}
                />
                {currentDogs?.map( el =>{
               return (
               <DogCard img={el.img} name={el.name} temperaments={el.temperament} key={el.id}/>
                    )
                })}
            </div>
        </div>
    )
}