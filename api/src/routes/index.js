const { Router } = require("express");
const axios = require("axios");
const { Dog, Temperament } = require("../db");
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
      height_metric: e.height.metric,
      height_imperial: e.height.imperial,
      weight_metric: e.weight.metric,
      weight_imperial: e.weight.imperial,
      temperament: e.temperament && e.temperament.split(", "),
      life_time: e.life_span,
      img: e.image.url,
      //      temperaments: e.temperament && e.temperament.split(", ")
    };
  });
  console.log("informacion de la api",apiInfo)
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
    height_metric,
    weight_metric,
    height_imperial,
    weight_imperial,
    temperament,
    life_time,
    img,
    createInDb,
  } = req.body;

  let dogCreated = await Dog.create({
    name,
    height_metric,
    weight_metric,
    height_imperial,
    weight_imperial,
    life_time,
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
    let dogId = await allDog.filter((el) => el.id == id);
    dogId.length
      ? res.status(200).json(dogId)
      : res.status(404).send("Lo siento, no se encontro el Perrito");
  }
});

module.exports = router;
