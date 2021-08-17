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
    if(!/^[1-9]\d*(\.\d+)?$/.test(input.height_min)){
        errors.height_min = 'El valor tiene que ser numerico no se permite coma';
    }
    if(!/^[1-9]\d*(\.\d+)?$/.test(input.height_max)){
        errors.height_min = 'El valor tiene que ser numerico no se permite coma';
    }
    if(!/^[1-9]\d*(\.\d+)?$/.test(input.weight_min)){
        errors.weight_min = 'El valor tiene que ser numerico no se permite coma';
    }
    if(!/^[1-9]\d*(\.\d+)?$/.test(input.weight_max)){
        errors.weight_max = 'El valor tiene que ser numerico no se permite coma';
    }
    if (!input.height_min){
        errors.height_min = 'Se requiere un valor minimo';
    }
    if (!input.weight_min ){
        errors.weight_min = 'Se requiere un valor minimo';
    }
    if (!input.life_time_min){
        errors.life_time_min = 'Se requiere un valor minimo';
    }

    if (!input.height_max){
        errors.height_max = 'Se requiere un valor maximo';
    }
    if (!input.weight_max ){
        errors.weight_max = 'Se requiere un valor maximo';
    }

    if(!/^[1-9]\d*(\.\d+)?$/.test(input.life_time_min)){
        errors.life_time_min = 'El valor tiene que ser numerico no se permite coma';
    }
    if(!/^[1-9]\d*(\.\d+)?$/.test(input.life_time_max)){
        errors.life_time_max = 'El valor tiene que ser numerico no se permite coma';
    }
    if (!input.life_time_max){
        errors.life_time_max = 'Se requiere un valor maximo';
    }
     if (input.img && !/[a-z0-9-\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?$/.test(input.img) ){
        errors.img = 'Debe ser una URL o estar vacio para tomar una Imagen por Defecto';
    }
    if (input.temperament.length <= 2){
        errors.temperament = 'Se requieren al menos tres(3) Temperamentos';
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

    function handleDelete(el){
        setInput({
            ...input,
            temperament: input.temperament.filter(e=> e !== el)
        })
    }
    

    function handleSubmit(e){
        e.preventDefault()
        console.log(input)
        if( Object.keys(errors).length === 0 && input.name !== "" && input.height_min !== "" && input.height_max !== "" && input.weight_min !== ""
        && input.weight_max !== "" && input.life_time_min !== "" && input.life_time_max !== "" && input.temperament.length !== 0 )
         
        {dispatch(postDogs(input))
        alert("Tu Perrito ha sido Creado con Exito!!!")
        setInput({
            name: "", height_min: "", height_max: "",  weight_min: "", weight_max: "", life_time_min: "", life_time_max: "", temperaments:[], imagen:"",
        })
        history.push('/home')}
        else{
        alert("Debe completar Todos los campos sin Errores primero")
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
                    <div className = {s.error}>
                    <input className={errors.username && s.danger && s.input} type="text" value={input.name} name='name' id='name' placeholder="Ingresa el Nombre!" onInput={(e)=>handleChange(e)} />
                    {errors.name && (<p className= {s.danger} >{errors.name}</p>)}
                    </div>
                </div>
                <br/>
                <label htmlFor="temperamentos">Selecciona al menos 3 Temperamentos: </label>
                {errors.temperament && (<p className= {s.danger} >{errors.temperament}</p>)}
                <select  className={s.select} onChange={(e)=> handleSelect(e)}>
                    {temperaments.map((temp)=>(
                        <option value={temp.name} key={temp.id}>{temp.name}</option>
                    ))}
                </select>
                
                <ul className={s.ul}><li className={s.lista}>{input.temperament.map(el=> <button className={s.botonTemp} type='button' key={el.id} onClick={()=>handleDelete(el)}>{el}</button>)}</li></ul>
                 <div>
                    
                    <label htmlFor="height_min">Tamaño </label>
                    <br/>
                    <input type="text" value={input.height_min} name='height_min' id='height_min'  placeholder="Min" onChange={(e)=>handleChange(e)}/>                   
                    Cms 
                    {errors.height_min && (<p className= {s.danger} >{errors.height_min}</p>)}
                    <label htmlFor="height_max"></label>
                    <input type="text" value={input.height_max} name='height_max' id='height_max'  placeholder="Max" onChange={(e)=>handleChange(e)}/>                   
                     Cms 
                     {errors.height_max && (<p className= {s.danger} >{errors.height_max}</p>)}
                </div>
                <div>
                    <label htmlFor="weight_min"> Peso </label>
                    <br/>
                     <input type="text" value={input.weight_min} name='weight_min' id='weight_min' placeholder="Min"  onChange={(e)=>handleChange(e)} />
                      Kgs
                      {errors.weight_min && (<p className= {s.danger} >{errors.weight_min}</p>)}

                     <label htmlFor="weight_max"></label>
                     <input type="text" value={input.weight_max} name='weight_max' id='weight_max' placeholder="Max"  onChange={(e)=>handleChange(e)} />
                      Kgs
                      {errors.weight_max && (<p className= {s.danger} >{errors.weight_max}</p>)}  
                </div>
                <div>
                    <label htmlFor="life_time_min">Tiempo de Vida </label>
                    <br/>
                    <input type="text" value={input.life_time_min} name='life_time_min' id='life_time_min' placeholder="Min"  onChange={(e)=>handleChange(e)} />
                     Años
                     {errors.life_time_min && (<p className= {s.danger} >{errors.life_time_min}</p>)}

                    <label htmlFor="life_time_max"></label>
                    <input type="text" value={input.life_time_max} name='life_time_max' id='life_time_max' placeholder="Max"  onChange={(e)=>handleChange(e)} />
                     Años
                     {errors.life_time_max && (<p className= {s.danger} >{errors.life_time_max}</p>)}
                  </div>
                  <div>
                    <label  className={s.text} htmlFor="img">Imagen:</label>
                    <br/>
                    <input type="text" value={input.img} name='img' placeholder="Ingresa la URL de tu Imagen" onChange={(e)=>handleChange(e)} />
                    {errors.img && (<p className= {s.danger} >{errors.img}</p>)}
                </div> 
                    <button className={s.boton} type='submit'>Crear Nuevo Perrito</button>
               
            </form>
        </div>
    )
}
