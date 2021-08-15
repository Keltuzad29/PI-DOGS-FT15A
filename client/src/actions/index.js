import axios from 'axios';

export function getDogs() {
    return async function(dispatch) {
      try {
        var json = await axios.get("http://localhost:3001/dogs");
        console.log(json)
        return dispatch({
            type: "GET_DOGS",
            payload: json.data
        }) 
      } catch (error) {
          console.log(error)
      }  
    }
    
}

export function getNameDogs(name){
    return async function(dispatch){
        try{
            var dogsByName = await axios.get("http://localhost:3001/dogs?name=" + name);
            return dispatch({
                type: "GET_NAME_DOGS",
                payload: dogsByName.data
            })
        }catch(error){
            alert("El Nombre ingresado no existe en la base de datos, prueba otro o agrega uno nuevo")
            console.log(error)
        }

    }
}

export function getTemperaments(){
    return async function (dispatch){
        var temp = await axios.get("http://localhost:3001/temperaments", {
        
        });
        console.log(temp.data)
        return dispatch ({type: "GET_TEMPERAMENTS", payload: temp.data});
    }
}

export function filterDogsByTemperaments(payload){
   // console.log("payload",payload)
    return{
        type: "FILTER_BY_TEMPERAMENTS",
        payload
    }
}

export function filterCreated(payload) {
    return{
        type:"FILTER_CREATED",
        payload
    }
}

export function postDogs(payload) {
   // console.log(payload)
    return async function (dispatch){
        const response = await axios.post("http://localhost:3001/dogs", payload);
        console.log(response);
        return response;
    }
    
}

export function orderByName(payload){
   
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
}



export function orderByWeight(payload){
   
    return {
        type: 'ORDER_BY_WEIGHT',
        payload
    }
}
