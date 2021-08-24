const { Router } = require("express");

const axios = require("axios");
const { Dog, Temperament, Op } = require("../db");
const { API_KEY } = process.env;

const router = Router();

Array.prototype.unique = (function (a) {
    return function () {
      return this.filter(a);
    };
  })(function (a, b, c) {
    return c.indexOf(a, b + 1) < 0;
  });
  
  //`https://api.thedogapi.com/v1/breeds${API_KEY}`
  // Configurar los routers
  // Ejemplo: router.use('/auth', authRouter);
  const getApiInfo = async () => {
    try {
      const apiUrl = await axios.get(
       `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
     );
     const apiInfo = await apiUrl.data.map((e) => {
       return {
         name: e.name,
         id: e.id,
         height_max:
           e.height.metric.split(" - ")[1] && e.height.metric.split(" - ")[1],
         height_min:
           e.height.metric.split(" - ")[0] && e.height.metric.split(" - ")[0],
         weight_max:
           e.weight.metric.split(" - ")[1] && e.weight.metric.split(" - ")[1],
         weight_min:
           e.weight.metric.split(" - ")[0] !== "NaN"
             ? e.weight.metric.split(" - ")[0]
             : 6,
         life_time_max:
           e.life_span.split(" - ")[1] &&
           e.life_span.split(" - ")[1].split(" ")[0],
         life_time_min: e.life_span.split(" - ")[0] && e.life_span.split(" - ")[0],
         temperament: e.temperament
           ? e.temperament
           : "🐶 Perrito sin Temperamentos 😭",
         img: e.image.url,
         origin: e.origin,
         //      temperaments: e.temperament && e.temperament.split(", ")
       };
     });
     //  console.log("informacion de la api",apiInfo)
     return apiInfo;
    } catch (error) {
      console.log("Hubo un error en el getApiInfo",error)
    }
  };
  
  const getDbInfo = async () => {
    try {
      return await Dog.findAll({
        include: {
          model: Temperament,
          attributes: ["name"], //traigo el nombre de los temperamentos
          through: {
            attributes: [], //tomo solo lo que queda en el arreglo atributes
          },
        },
      });
    } catch (error) {
      console.log("Hubo un error en getDbInfo", error)
    }
  };
  
  const getAllDogs = async () => {
    try {
      const apiInfo = await getApiInfo();
      const dbInfo = await getDbInfo();
      const allInfo = apiInfo.concat(dbInfo);
      return allInfo;
    } catch (error) {
      console.log("Se encontro un error en getAllDogs", error)
    }
  };

router.get("/dogs", async (req, res) => {
    try {
      const { name } = req.query;
      let dogsTotal = await getAllDogs();
      if (name) {
        let dogsName = await dogsTotal.filter((e) =>
          e.name.toLowerCase().includes(name.toLowerCase())
        );
        dogsName.length // el tamaño de mi arreglo siempre sera 1
          ? res.status(200).send(dogsName)
          : res.status(404).send("Lo siento, no se encontro el Perrito Buscado");
      } else {
        res.status(200).send(dogsTotal);
      }
    } catch (error) {
      console.log("Se encontro una falla en el get /dogs", error)
    }
  });
  
  router.get("/temperaments", async (req, res) => {
    try {
      const allTemperaments = await Temperament.findAll();
      console.log("antes del if", allTemperaments.length);
      if (allTemperaments.length === 0) {
        console.log("entre");
        const temperamentsApi = await axios.get(
          `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
        );
        const temperaments = temperamentsApi.data.map((e) => {
          const todos = e.temperament;
          return todos;
        });
        const sinEspacios = temperaments.map((e) => e && e.split(", ")).flat(); // intera en los array y devuelve un solo array con todos los elementos
        const sinRepetidos = sinEspacios.unique().sort();
        // console.log("4", sinRepetidos.length);
        var aux = sinRepetidos
          .map((e) => {
            return {
              name: e,
            };
          })
          .filter((e) => e.name);
        const todos = await Temperament.bulkCreate(aux); //recibe un arreglo con objetos y asigna a mi tabla segun la propiedad el valor
        return res.send(todos);
      } else {
        console.log("estoy en else");
        return res.send(allTemperaments);
      }
    } catch (error) {
      console.log("Se encontro un Error en get /temperaments", error)
    }
  });
  
  router.post("/dogs", async (req, res) => {
    try{
  
      const {
        name,
        height_max,
        height_min,
        weight_max,
        weight_min,
        life_time_max,
        life_time_min,
        temperament,
        img,
        createInDb,
      } = req.body;
    
      let dogCreated = await Dog.create({
        name,
        height_max,
        height_min,
        weight_max,
        weight_min,
        life_time_max,
        life_time_min,
        img,
        createInDb,
      });
    
      let temperamentDb = await Temperament.findAll({
        where: { name: temperament },
      });
      await dogCreated.addTemperaments(temperamentDb); // se agrega el await para esperar que se encuentren los temperaments
      res.send("El Perrito ha sido creado con exito");
    }
    catch(error){
      console.log("Se presento un error en el Post", error)
    }
  });
  
  router.get("/dogs/:id", async (req, res) => {
    try{
    const { id } = req.params;
    const allDog = await getAllDogs();
    if (id) {
      let dogId = await allDog.filter((el) => el.id.toString() === id.toString());
      dogId.length
        ? res.status(200).json(dogId)
        : res.status(404).send("Lo siento, no se encontro el Perrito");
    }
  }catch(error){
    console.log("Se presento un error en la ruta get /dogs/:id", error)
  }
  });
  
  //pendiente
  router.delete("/dogs/:name", async (req, res) => {
    try{
      const { name } = req.params;
    const dog = await Dog.destroy({
      where: { name: { [Op.like]: `%${name}%` } },
    });
    res.json(dog);
  }catch(error){
    console.log("Se presento un error en la ruta Delete /dogs/:name", error)
  }
  });
  
  module.exports = router;