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
      validate: {
        isString(value) {
            if (typeof value !== 'string') throw new Error('Description must be a string!!!!');
        }
      }
    },
    rol:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isString(value) {
            if (typeof value !== 'string') throw new Error('Description must be a string!!!!');
        }
      }
    },
        
    email:{
      type:DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
          isEmail: true,
      }
    },



    password:{
      type: DataTypes.STRING,
      allowNull: false,
       get() {
            return () => this.getDataValue('password')
      }
    },


    salt:{
      type: DataTypes.STRING,
      get() {
            return() => this.getDataValue('salt')
      }
    }



  });
};