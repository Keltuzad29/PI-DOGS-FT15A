const { DataTypes} = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("Dog", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height_metric:{
      type:DataTypes.STRING,
      allowNull: false
    },
    height_imperial:{
      type:DataTypes.STRING,
      allowNull: true
    },
    weight_metric:{
      type:DataTypes.STRING,
      allowNull: false
    },
    weight_imperial:{
      type:DataTypes.STRING,
      allowNull: true
    },
    life_time:{
      type:DataTypes.STRING,
      allowNull: false
    },
    createInDb:{
      type:DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    img: {
      type:DataTypes.STRING,
      allowNull: true,
      defaultValue: "https://www.anipedia.net/imagenes/nombres-de-perros-800x375.jpg"
     },
    
},
  {
    timestamps:false,
    // timestamps: true,
    // createdAt: false,
    // updatedAt: "Actualizacion",
  }
  );
};
