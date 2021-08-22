import React from "react";
//importo los hook que voy a usar de react
import { useState, useEffect } from "react";
//importo los hooks de react-redux (previamente se instala npm i react-redux)
import { useDispatch, useSelector } from "react-redux";
//importo las actions que me interesa usar en este componente
import { getDogs, orderByName, orderByWeight, getTemperaments} from "../actions";
//importo los componentes que voy a usar
import DogCard from "./DogCard";
import Paginado from "./Paginado";
import s from "../styles/Home.module.css"
import NavBar from "./NavBar";
import { NavLink } from "react-router-dom";


export default function Home(){

    const dispatch = useDispatch()
    const allDogs = useSelector((state)=> state.dogs)
    const [orden, setOrden]= useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [dogsPerPage, setDogsPerPage] = useState(9)
    const indexOfLastDog = currentPage * dogsPerPage // 1*9=9 2*9=18 3*9=27 4*9=36 5*9=45...
    const indexOfFirstDog = indexOfLastDog - dogsPerPage // 9-9=0 18-9=9 27-9=18 36-9=27 45-9=36...
    const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog)

    // const temperaments = useSelector((state)=> state.Temperaments)

    const paginado = (pageNumber)=>{
        setCurrentPage(pageNumber)
    }

    useEffect (()=>{
        dispatch(getDogs());
        dispatch(getTemperaments())
    }, [])




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
            <NavBar />   
            <div className={s.inputs}>      
                <select className={s.select} onChange={e=> handleSort(e)}>
                    <option value='asc'>Ascendente ↑</option>
                    <option value='desc'>Descendente ↓</option>   
                </select>

                <select className={s.select} onChange={e=> handleSortWeight(e)}>
                    <option value='weightasc'>Peso ↑</option>
                    <option value='weightdesc'>Peso ↓</option>   
                </select>
            </div>
                <Paginado
                dogsPerPage= {dogsPerPage}
                allDogs= {allDogs.length}
                paginado= {paginado}
                />
            <div className={s.dogCards}>
               <ul className={s.dogsGrid}> {currentDogs?.map( el =>{
             
              return (
              <div className={s.margin}> <NavLink className={s.navlink} to={`/home/${el.id}`} > <DogCard  img={el.img ? el.img : "https://www.anipedia.net/imagenes/nombres-de-perros-800x375.jpg"}
                name={el.name} temperaments={!el.createInDb ? el.temperament : el.Temperaments.map(e=>e.name + " ") }key={el.id} />
                   </NavLink></div>  )
                })}
                </ul>
            </div>
        </div>
    )
}
//temperaments={el.temperament ? el.temperament : el.Temperaments.map(e=>e.name + ", ")