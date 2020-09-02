const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('user', {

      //Vinculada en db.js por ser una FK
      //idReviews

    name: {
            type: DataTypes.STRING,
        allowNull: false,
        },

        rol:{
        type: DataTypes.STRING,
        allowNull: false,
        },

        email:{
        type:DataTypes.STRING,
        allowNull: false,
        isUnique: true,
        validate: {
            isEmail: true,
            isUnique: sequelize.validateIsUnique('email')
        }
        },
        
    password:{
        type: DataTypes.STRING,
        allowNull: false,
        },
    });
};
