import React, { useState, useEffect } from 'react';
import {Link, useHistory} from 'react-router-dom';
import { postDogs, getTemperaments } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import s from './DogCreate.module.css';



function validate(input){
    let errors = {};
    if (!input.name) {
        errors.name = 'Se requiere un Nombre para el Perrito';
      } 
    if (!input.height_imperial){
        errors.height_imperial = 'Se requiere un Tamaño para el Perrito';
    }
    if (!input.weight_imperial) {
        errors.weight_imperial = 'Se requiere un peso para el Perrito';
      } 
    if (!input.life_time){
        errors.life_time = 'Se requiere un Nombre para el Perrito';
    }
    if (!input.temperament) {
        errors.temperament = 'Se requieren Temperamentos para el Perrito';
      } 
    if (!/^((ftp|http|https):\/\/)?www\.([A-z]+)\.([A-z]{2,})/.test(input.img)){
        errors.img = 'La imagen debe ser una URL';
    }
    return errors
}


export default function DogCreate(){
    const dispatch = useDispatch()
    const history = useHistory()
    const temperaments = useSelector((state)=> state.temperaments)
    const [errors, setErrors] = useState({})

    const[input, setInput] = useState({
        name: "",
        height_imperial: "",
        weight_imperial: "",
        life_time: "",
        temperament:[],
        img:"",
    })

   
    function handleChange(e){
       
        setInput({
        ...input,
        [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value

        }));

        console.log(input)
    }

    function handleSelect(e){
        setInput({
            ...input,
            temperament: [...input.temperament, e.target.value] 
        })
    }

    function handleClear(e){
        setInput({
            ...input,
            temperament:[]
        }
        )
    }

    function handleFilter(key){
       input.temperament.filter(e=> e.key !== key)
    }
    

    function handleSubmit(e){
        e.preventDefault()
        console.log(input)
        if(input.name !== "" && input.height_imperial !== "" && input.weight_imperial !== ""
         && input.life_time !== "" && input.temperament !== [] )
         
        {dispatch(postDogs(input))
        alert("Tu Perrito ha sido Creado con Exito!!!")
        setInput({
            name: "", height_imperial: "",  weight_imperial: "", life_time: "", temperaments:[], imagen:"",
        })
        history.push('/home')}
        else{
        alert("Debe completar Todos los campos primero")
    }
    }

    useEffect(() => {
        dispatch(getTemperaments())
    }, []);

    
    return(
        <div>
            <Link to ="/home"><button>Volver</button></Link>
            <h1>Creá tu nuevo Perrito!</h1>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <div>
                    <label for="name" htmlFor="name">Nombre </label>
                    <input className={errors.username && 'danger'} type="text" value={input.name} name='name' id='name' placeholder="Ingresa el Nombre!" onInput={(e)=>handleChange(e)} />
                    {errors.name && (<label className="danger" >{errors.name}</label>)}
                </div>
                
                <div>
                    
                    <label htmlFor="height_imperial">Tamaño </label>
                    <input type="text" value={input.height_imperial} name='height_imperial' id='height_imperial'  placeholder="Min - Max" onChange={(e)=>handleChange(e)}/>                   
                    Cms
                </div>
                <div>
                    <label htmlFor="weight_imperial">Peso </label>
                     <input type="text" value={input.weight_imperial} name='weight_imperial' id='weight_imperial' placeholder="Min - Max"  onChange={(e)=>handleChange(e)} />
                     Kgs
                </div>
                <div>
                    <label htmlFor="life_time">Tiempo de Vida </label>
                    <input type="text" value={input.life_time} name='life_time' id='life_time' placeholder="Min - Max"  onChange={(e)=>handleChange(e)} />
                    Años
                  </div>
                  <div>
                    <label  className={s.text} htmlFor="img">Imagen:</label>
                    <input type="text" value={input.img} name='img' placeholder="Ingresa la URL de tu Imagen" onChange={(e)=>handleChange(e)} />
                </div>
                <label htmlFor="temperamentos">Selecciona los Temperamentos: </label>
                <br/>
                <select onChange={(e)=> handleSelect(e)}>
                    {temperaments.map((temp)=>(
                        <option value={temp.name} key={temp.id}>{temp.name}</option>
                    ))}
                </select>
                <ul><li className={s.lista}>{input.temperament.map(el=> <button type='button' key={el.id} onClick={handleFilter} >{el}</button>)}</li></ul>
                <div>
                    <button type='button' onClick={handleClear}>Limpiar Temperamentos</button>
                    <button type='submit'>Crear Nuevo Perrito</button>
                </div>
            </form>
        </div>
    )
}
