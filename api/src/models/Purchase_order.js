const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
    sequelize.define('purchase_order', {

  //Vinculada en db.js por ser una FK

        // idUser  y mail:{    
        // idOrderLine:{     

    state:{
      type: DataTypes.STRING,
        allowNull: false,
    },

    recipiant_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    
    recipian_lastname: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    country:{
        type: DataTypes.STRING,
        allowNull: false,
    },

    city:{
      type: DataTypes.STRING,
      allowNull: false,
  },

    adress:{
      type: DataTypes.INTEGER,
      allowNull: false,
      
    },

    postal_code:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    phone_number:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    
    shipping_type:{
      type:DataTypes.STRING,
      allowNull: false,
    },

    Payment_date:{
      type:DataTypes.DATE,
      allowNull:false,
    }
  });
};
