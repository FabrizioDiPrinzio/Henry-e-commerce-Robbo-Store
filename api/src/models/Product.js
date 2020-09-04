const {DataTypes} = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = sequelize => {
	// defino el modelo
	sequelize.define('product', {
		//Vinculada en db.js por ser una FK
		//idUser
		//idCategories
		//idReviews

		name: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
					isString(value) {
					if (typeof value !== 'string') throw new Error('Name must be a string!!!!');
				}
			}
		},

		price: {
			type: DataTypes.FLOAT,
			allowNull: false,
			validate: {
				isNumeric: true
			}
		},

		stock: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				isNumeric: true
			}
		},

		images: {
			type: DataTypes.ARRAY(DataTypes.TEXT), // hay que definir que contiene el array, en este caso array de textos.
			allowNull: false,
			validate: {
				isArray(value) {
					if (Array.isArray(value)) throw new Error('Images must be inside an Array! Why u hate Arrays? o(TヘTo)');
				}
			}
		},

		description: {
			type: DataTypes.TEXT,
			allowNull: false,
			validate: {
				isString(value) {
					if (typeof value !== 'string') throw new Error('Description must be a string!!!!');
				}
			}
		}
	});
};
