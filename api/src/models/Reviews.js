const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
    sequelize.define('reviews', {

        //Vinculada en db.js por ser una FK
        //idUser 
        //idProduct 

        commentary:{
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [15, 200]
            }
        },

        qualification:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });
};
