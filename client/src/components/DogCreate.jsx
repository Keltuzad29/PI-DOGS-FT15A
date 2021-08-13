import React, { useState, useEffect } from 'react';
import {Link, useHistory} from 'react-router-dom';
import { postDogs, getTemperaments } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import './DogCreate.css';



function validate(input){
    let errors = {};
    if (!input.username) {
        errors.username = 'Se requiere un Nombre para el Perrito';
      } 
    if (!input.weight_max){
        errors.username = 'Se requiere un Nombre para el Perrito';
    }
}


export default function DogCreate(){
    const dispatch = useDispatch()
    const history = useHistory()
    const temperaments = useSelector((state)=> state.temperaments)

    const[input, setInput] = useState({
        name: "",
        height_metric: "",
        weight_metric: "",
        life_time: "",
        temperaments:[],
        img:"",
    })

   
    function handleChange(e){
       
                setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        console.log(input)
    }


    
    //pasarlo para utilizar un checkbox
        function handleCheck(e){
        if (e.target.checked){
            setInput({
                ...input,
                status: e.target.value
            })
        }
    }

    function handleSelect(e){
        setInput({
            ...input,
            temperaments: [...input.temperaments, e.target.value] 
        })
    }
    function handleClear(e){
        setInput({
            ...input,
            temperaments:[]
        }
        )
    }

    function handleSubmit(e){
        e.preventDefault()
        console.log(input)
        if(input.name !== "" && input.height_max !== "" && input.height_min !== "" && input.weight_max !== ""
         && input.weight_min !== "" && input.life_time_min !== "" && input.life_time_max !== "" && input.temperaments !== [] )
         
        {dispatch(postDogs(input))
        alert("Tu Perrito ha sido Creado con Exito!!!")
        setInput({
            name: "", height_metric: "", height_max: "", height_min: "", weight_max: "", weight_min: "", weight_metric: "", 
            life_time_min: "", life_time_max: "", life_time: "", temperaments:[], imagen:"",
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
                    <label htmlFor="name">Nombre</label>
                    <input type="text" value={input.name} name='name' id='name' placeholder="Ingresa el Nombre!" onInput={(e)=>handleChange(e)}/>
                </div>
                
                <div>
                    
                    <label htmlFor="height_metric">Tamaño </label>
                    <input type="text" value={input.height_metric} name='height_metric' id='height_metric'  placeholder="Min - Max" onChange={(e)=>handleChange(e)}/>                   
                    Cms
                </div>
                <div>
                    <label htmlFor="weight_metric">Peso </label>
                     <input type="text" value={input.weight_metric} name='weight_metric' id='weight_metric' placeholder="Min - Max"  onChange={(e)=>handleChange(e)}/>
                     Kgs
                </div>
                <div>
                    <label htmlFor="life_time">Tiempo de Vida </label>
                    <input type="text" value={input.life_time} name='life_time' id='life_time' placeholder="Min - Max"  onChange={(e)=>handleChange(e)}/>
                    Años
                  </div>
                <div>
                <label htmlFor="temperaments">Temperaments:</label>
                <input type="text" value={input.temperaments} name='temperaments' id="temperaments" onChange={(e)=>handleChange(e)}/>
                </div>

                <div>
                    <label htmlFor="img">Imagen:</label>
                    <input type="text" value={input.img} name='img' onChange={(e)=>handleChange(e)}/>
                </div>
                <select onChange={(e)=> handleSelect(e)}>
                    {temperaments.map((temp)=>(
                        <option value={temp.name} key={temp.id}>{temp.name}</option>
                    ))}
                </select>
                <ul><li>{input.temperaments.map(el=> <button type='button' key={el.id}>{el}</button>)}</li></ul>
                <div>
                    <button type='button' onClick={handleClear}>Limpiar Temperamentos</button>
                    <button type='submit'>Crear Nuevo Perrito</button>
                </div>
            </form>
        </div>
    )
}
