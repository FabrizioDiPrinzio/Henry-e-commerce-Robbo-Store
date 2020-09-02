const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('orderline', {


    //Vinculado en db.js por ser una FK
    // idCart:{ 
    //idProduct:{
    
    price:{
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isNumeric: true,
      }
    },

    quantity:{
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true,
      }
    },
  });
};
