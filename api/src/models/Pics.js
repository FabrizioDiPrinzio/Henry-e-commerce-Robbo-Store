const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pics', {

    //Vinculada en db.js por ser una FK
    //productId

    imageUrl:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true
      }
    }     
  });
}