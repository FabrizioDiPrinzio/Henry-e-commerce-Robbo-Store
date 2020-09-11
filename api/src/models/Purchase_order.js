const {DataTypes} = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = sequelize => {
	// defino el modelo
	sequelize.define('purchase_order', {
		//Vinculada en db.js por ser una FK

		// idUser  y mail:{
		// idOrderLine:{

		status: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: 'enCarrito',
			validate: {
				isString(value) {
					if (value && typeof value !== 'string') throw new Error('Status must be a string!!!!');
				}
			}
		},

		recipient_name: {
			type: DataTypes.STRING,
			allowNull: true,
			validate: {
				isString(value) {
					if (value && typeof value !== 'string') throw new Error('Name must be a string!!!!');
				}
			}
		},

		recipient_lastname: {
			type: DataTypes.STRING,
			allowNull: true,
			validate: {
				isString(value) {
					if (value && typeof value !== 'string') throw new Error('Last name must be a string!!!!');
				}
			}
		},

		country: {
			type: DataTypes.STRING,
			allowNull: true,
			validate: {
				isString(value) {
					if (value && typeof value !== 'string') throw new Error('Country must be a string!!!!');
				}
			}
		},

		city: {
			type: DataTypes.STRING,
			allowNull: true,
			validate: {
				isString(value) {
					if (value && typeof value !== 'string') throw new Error('City must be a string!!!!');
				}
			}
		},

		address: {
			type: DataTypes.STRING,
				validate: {
				isString(value) {
					if (typeof value !== 'string') throw new Error('Address must be a string!!!!');
				}
			}
		},

		postal_code: {
			type: DataTypes.INTEGER,
			allowNull: true,
			validate: {
				isNumeric: true
			}
		},

		phone_number: {
			type: DataTypes.INTEGER,
			allowNull: true,
			validate: {
				isNumeric: true
			}
		},

		shipping_type: {
			type: DataTypes.STRING,
			allowNull: true,
			validate: {
				isString(value) {
					if (value && typeof value !== 'string') throw new Error('Shipping type must be a string!!!!');
				}
			}
		}

		// Payment_date:{
		//   type:DataTypes.DATE,
		//   allowNull:false,
		//   validate:{
		//     isDate: true,
		//   }
		// }
	});
};
