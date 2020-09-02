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
        validate: {
          isString(value) {
            if (typeof value !== 'string') throw new Error('Description must be a string!!!!');
          }
        }
    },

    recipiant_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isString(value) {
            if (typeof value !== 'string') throw new Error('Description must be a string!!!!');
          }
        }
    },
    
    recipian_lastname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isString(value) {
            if (typeof value !== 'string') throw new Error('Description must be a string!!!!');
          }
        }
    },

    country:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isString(value) {
            if (typeof value !== 'string') throw new Error('Description must be a string!!!!');
          }
        }
    },

    city:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
				isString(value) {
					if (typeof value !== 'string') throw new Error('Description must be a string!!!!');
				}
			}
  },

    adress:{
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        isNumeric: true,   
      }
    },
      
    postal_code:{
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        isNumeric: true,   
      }
    },

    phone_number:{
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        isNumeric: true,   
      }
    },
    
    shipping_type:{
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
				isString(value) {
					if (typeof value !== 'string') throw new Error('Description must be a string!!!!');
				}
			}
    },

    // Payment_date:{
    //   type:DataTypes.DATE,
    //   allowNull:false,
    //   validate:{
    //     isDate: true,       
    //   }
    // }
  });
};
