const { Router } = require("express");

const axios = require("axios");
const { Dog, Temperament, Op } = require("../db");
const { API_KEY } = process.env;
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

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
  const apiUrl = await axios.get(
    `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
  );
  const apiInfo = await apiUrl.data.map((e) => {
    return {
      name: e.name,
      id: e.id,
      height_max: e.height.metric.split(" - ")[1] && e.height.metric.split(" - ")[1],
      height_min: e.height.metric.split(" - ")[0] && e.height.metric.split(" - ")[0],
      weight_max: e.weight.metric.split(" - ")[1] && e.weight.metric.split(" - ")[1], 
      weight_min: e.weight.metric.split(" - ")[0] !== "NaN"
      ? e.weight.metric.split(" - ")[0] : 6,
      life_time_max: e.life_span.split(" - ")[1] && e.life_span.split(" - ")[1].split(" ")[0],
      life_time_min: e.life_span.split(" - ")[0] && e.life_span.split(" - ")[0],
      temperament: e.temperament ? e.temperament : "🐶 Perrito sin Temperamentos 😭",
      img: e.image.url,
      origin: e.origin,
      //      temperaments: e.temperament && e.temperament.split(", ")
    };
  });
//  console.log("informacion de la api",apiInfo)
  return apiInfo;
};

const getDbInfo = async () => {
  return await Dog.findAll({
    include: {
      model: Temperament,
      attributes: ["name"], //traigo el nombre de los temperamentos
      through: {
        attributes: [], //tomo solo lo que queda en el arreglo atributes
      },
    },
  });
};

const getAllDogs = async () => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  const allInfo = apiInfo.concat(dbInfo);
  return allInfo;
};

router.get("/dogs", async (req, res) => {
  const { name } = req.query;
  let dogsTotal = await getAllDogs();
  if (name) {
    let dogsName = await dogsTotal.filter((e) =>
      e.name.toLowerCase().includes(name.toLowerCase())
    );
    dogsName.length
      ? res.status(200).send(dogsName)
      : res.status(404).send("Lo siento, no se encontro el Perrito Buscado");
  } else {
    res.status(200).send(dogsTotal);
  }
});

router.get("/temperaments", async (req, res) => {
  const temperamentsApi = await axios.get(
    `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
  );
  // let array = []

  const temperaments = temperamentsApi.data.map((e) => {
    //console.log(e.temperament)

    const repetidos = e.temperament;
    return repetidos;
    //   console.log(repetidos)
    // array.push(repetidos)

    //   (e) => e.temperament && e.temperament.split(", ")
  });
  
  const sinEspacios = temperaments.map((e) => e && e.split(", ")).flat(); // intera en los array y devuelve un solo array con todos los elementos
  //   console.log(sinEspacios.length)

  const sinRepetidos = sinEspacios.unique().sort();
  // console.log("4", sinRepetidos.length);
  sinRepetidos.forEach((e) => {
    // console.log("elementos", e)
    if (e) {
      Temperament.findOrCreate({
        where: { name: e },
      });
    }
  });

  const allTemperaments = await Temperament.findAll();
  //console.log("Todos los Temperamentos", allTemperaments.length)
  return res.send(allTemperaments);
});

router.post("/dogs", async (req, res) => {
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
  dogCreated.addTemperaments(temperamentDb);
  res.send("El Perrito ha sido creado con exito");
});

router.get("/dogs/:id", async (req, res) => {
  const { id } = req.params;
  const allDog = await getAllDogs();
  if (id) {
    let dogId = await allDog.filter((el) => el.id.toString() === id.toString());
    dogId.length
      ? res.status(200).json(dogId)
      : res.status(404).send("Lo siento, no se encontro el Perrito");
  }
});

router.delete("/dogs/:name", async (req, res)=>{
  const {name} = req.params;
  const dog = await Dog.destroy({
    where: {name:{[Op.like]: `%${name}%`}}
  });
  res.json(dog);
});

module.exports = router;
