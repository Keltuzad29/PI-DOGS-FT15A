import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import Logo from "../dog.png";
import huella from '../huellitaNew.jpg'
import {
  getDogs,
  filterDogsByTemperaments,
  filterCreated,
  getTemperaments,
} from "../actions";

import s from "../styles/NavBar.module.css";
import SearchBar from "./SearchBar";

export default function NavBar() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);

  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage, setDogsPerPage] = useState(9);
  const indexOfLastDog = currentPage * dogsPerPage; // 1*9=9 2*9=18 3*9=27 4*9=36 5*9=45...
  const indexOfFirstDog = indexOfLastDog - dogsPerPage; // 9-9=0 18-9=9 27-9=18 36-9=27 45-9=36...
  const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog);

  const temperaments = useSelector((state) => state.temperaments);



  useEffect(() => {
    dispatch(getDogs());
    dispatch(getTemperaments());
  }, []);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getDogs());
  }

  function handleFilterTemperament(e) {
    dispatch(filterDogsByTemperaments(e.target.value));
  }

  function handleFilterCreated(e) {
    dispatch(filterCreated(e.target.value));
  }

  return (
    <header className={s.navbar} >
         <nav >
        <ul className={s.list}>
          <li className={s.list_item}>
      <NavLink className={s.home} exact to="/">
          <img className={s.imgHome} id="logoDog" src={Logo} width="30" height="30" alt="" />
      </NavLink>
    <div className={s.inputs}>
      <div className={s.filtros}><div><label className={s.label} htmlFor="select">Temperamentos</label>
      <select className={s.select} onChange={(e) => handleFilterTemperament(e)}>
        {temperaments.map((temp) => (
          <option value={temp.name} key={temp.id}>
            {temp.name}
          </option>
        ))}
      </select></div>

      <div><label className={s.label} htmlFor="select">Api VS DB</label>
      <select className={s.select} onChange={(e) => handleFilterCreated(e)}>
        <option value="All">Todos</option>
        <option value="created">Creados</option>
        <option value="api">Existente</option>
      </select></div>
      </div>
      <button
        className={s.boton}
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Volver a Cargar Todos los Perros
      </button>
      </div>
      <h1 className={s.title}>MUNDO PERRUNO</h1>
      <SearchBar />
      <Link className={s.newdog} to="/dogs">
       <img className={s.imgNew} src={huella} alt="img not found"></img>
      </Link>  
          </li>
        </ul>
      </nav>
    </header>
  );
}
