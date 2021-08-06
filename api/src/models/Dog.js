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
      allowNull: false
    },
    weight_metric:{
      type:DataTypes.STRING,
      allowNull: false
    },
    weight_imperial:{
      type:DataTypes.STRING,
      allowNull: false
    },
    life_time:{
      type:DataTypes.STRING,
      allowNull: true
    },
    createInDB:{
      type:DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    url_Image: {
      type:DataTypes.STRING,
      allowNull: true,
      defaultValue: "https://images.pexels.com/photos/2023384/pexels-photo-2023384.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
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
