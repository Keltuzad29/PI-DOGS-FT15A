import React, { useState, useEffect } from 'react';
import {Link, useHistory} from 'react-router-dom';
import { postDogs, getTemperaments } from '../actions';
import { useDispatch, useSelector } from 'react-redux';



export default function DogCreate(){
    const dispatch = useDispatch()
    const history = useHistory()
    const temperaments = useSelector((state)=> state.temperaments)

    const[input, setInput] = useState({
        name: "",
        height_min: "",
        height_max: "",
        weigth_min: "",
        weigth_max: "",
        life_time_min: "",
        life_time_max: "",
        temperaments:[],
        imagen:"",
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
        dispatch(postDogs(input))
        alert("Tu Perrito ha sido Creado con Exito!!!")
        setInput({
            name: "",
            height_min: "",
            height_max: "",
            weigth_min: "",
            weigth_max: "",
            life_time_min: "",
            life_time_max: "",
            temperaments:[],
            imagen:"",
        })
        history.push('/home')
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
                    <input type="text" value={input.name} name='name' onChange={handleChange}/>
                </div>
                <div>
                    <div>
                    <label htmlFor="height_min">Tamaño Minimo</label>
                    <input type="text" value={input.height_min} name='height_min' onChange={handleChange}/>
                    </div>
                    <div>
                    <label htmlFor="height_max">Tamaño Maximo</label>
                    <input type="text" value={input.height_max} name='height_max' onChange={handleChange}/>
                    </div>
                </div>
                <div>
                    <div>
                    <label htmlFor="weight_min">Peso Maximo</label>
                    <input type="text" value={input.weight_min} name='weight_min' onChange={handleChange}/>
                    </div>
                    <div>
                    <label htmlFor="weight_max">Peso Minimo</label>
                    <input type="text" value={input.weight_max} name='weight_max' onChange={handleChange}/>
                    </div>
                </div>
                <div>
                    <div>
                    <label htmlFor="life_time_min">Tiempo de Vida Minimo</label>
                    <input type="text" value={input.life_time_min} name='life_time_min' onChange={handleChange}/>
                    </div>
                    <div>
                    <label htmlFor="life_time_max">Tiempo de Vida Maximo</label>
                    <input type="text" value={input.life_time_max} name='life_time_max' onChange={handleChange}/>
                    </div>
                </div>
                <div>
                    <label htmlFor="temperamentos">Temperamentos</label>
                    <input type="text" value={input.temperaments} name='temperamentos' onChange={handleChange}/>
            
                </div>
                <div>
                    <label htmlFor="imagen">Imagen:</label>
                    <input type="text" value={input.image} name='imagen' onChange={handleChange}/>
                </div>
                <select onChange={(e)=> handleSelect(e)}>
                    {temperaments.map((temp)=>(
                        <option value={temp.name} key={temp.id}>{temp.name}</option>
                    ))}
                </select>
                <ul><li>{input.temperaments.map(el=> el + '  ')}</li></ul>
                <div>
                    <button type='button' onClick={handleClear}>Limpiar Temperamentos</button>
                    <button type='submit'>Crear Nuevo Perrito</button>
                </div>
            </form>

        </div>
    )
}
