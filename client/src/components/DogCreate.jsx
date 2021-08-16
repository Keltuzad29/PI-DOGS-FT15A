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
    if (!input.height_metric){
        errors.height_metric = 'Se requiere un Tamaño para el Perrito';
    }
    if (!input.weight_metric) {
        errors.weight_metric = 'Se requiere un peso para el Perrito';
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
        height_min: "",
        height_max: "",
        weight_min: "",
        weight_max: "",
        life_time_min: "",
        life_time_max: "",
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
        if(input.name !== "" && input.height_min !== "" && input.height_max !== "" && input.weight_min !== ""
        && input.weight_max !== "" && input.life_time_min !== "" && input.life_time_max !== "" && input.temperament !== [] )
         
        {dispatch(postDogs(input))
        alert("Tu Perrito ha sido Creado con Exito!!!")
        setInput({
            name: "", height_min: "", height_max: "",  weight_min: "", weight_max: "", life_time_min: "", life_time_max: "", temperaments:[], imagen:"",
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
            <Link to ="/home"><button className={s.boton}>Volver</button></Link>
            <h1 className={s.text}>Creá tu nuevo Perrito!</h1>
            <form className={s.form} onSubmit={(e)=>handleSubmit(e)}>
                <div>
                    <label for="name" htmlFor="name">Nombre </label>
                    <br/>
                    <input className={errors.username && 'danger'} type="text" value={input.name} name='name' id='name' placeholder="Ingresa el Nombre!" onInput={(e)=>handleChange(e)} />
                    {errors.name && (<label className="danger" >{errors.name}</label>)}
                </div>
                
                <div>
                    
                    <label htmlFor="height_min">Tamaño </label>
                    <br/>
                    <input type="text" value={input.height_min} name='height_min' id='height_min'  placeholder="Min" onChange={(e)=>handleChange(e)}/>                   
                    Cms 

                    <label htmlFor="height_max"></label>
                    <input type="text" value={input.height_max} name='height_max' id='height_max'  placeholder="Max" onChange={(e)=>handleChange(e)}/>                   
                     Cms 
                </div>
                <div>
                    <label htmlFor="weight_min"> Peso </label>
                    <br/>
                     <input type="text" value={input.weight_min} name='weight_min' id='weight_min' placeholder="Min"  onChange={(e)=>handleChange(e)} />
                      Kgs

                     <label htmlFor="weight_max"></label>
                     <input type="text" value={input.weight_max} name='weight_max' id='weight_max' placeholder="Max"  onChange={(e)=>handleChange(e)} />
                      Kgs  
                </div>
                <div>
                    <label htmlFor="life_time_min">Tiempo de Vida </label>
                    <br/>
                    <input type="text" value={input.life_time_min} name='life_time_min' id='life_time_min' placeholder="Min"  onChange={(e)=>handleChange(e)} />
                     Años

                    <label htmlFor="life_time_max"></label>
                    <input type="text" value={input.life_time_max} name='life_time_max' id='life_time_max' placeholder="Max"  onChange={(e)=>handleChange(e)} />
                     Años
                  </div>
                  <div>
                    <label  className={s.text} htmlFor="img">Imagen:</label>
                    <br/>
                    <input type="text" value={input.img} name='img' placeholder="Ingresa la URL de tu Imagen" onChange={(e)=>handleChange(e)} />
                </div>
                <label htmlFor="temperamentos">Selecciona los Temperamentos: </label>
                <select  className={s.select} onChange={(e)=> handleSelect(e)}>
                    {temperaments.map((temp)=>(
                        <option value={temp.name} key={temp.id}>{temp.name}</option>
                    ))}
                </select>
                <ul><li className={s.lista}>{input.temperament.map(el=> <button className={s.botonTemp} type='button' key={el.id} onClick={handleFilter} >{el}</button>)}</li></ul>
                <div>
                    <button className={s.boton} type='button' onClick={handleClear}>Limpiar Temperamentos</button>
                    <button className={s.boton} type='submit'>Crear Nuevo Perrito</button>
                </div>
            </form>
        </div>
    )
}
