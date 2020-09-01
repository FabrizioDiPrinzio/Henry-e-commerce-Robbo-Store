const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
    sequelize.define('categories', {

      //Vinculada en db.js por ser una FK
      //idProduct

    name:{
        type: DataTypes.STRING,
        allowNull: false,
        },
        
    description:{
        type: DataTypes.TEXT,
        allowNull: false,
        },
    });
};
