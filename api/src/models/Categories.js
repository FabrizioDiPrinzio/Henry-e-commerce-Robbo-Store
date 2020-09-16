const {DataTypes} = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = sequelize => {
	// defino el modelo
	sequelize.define('categories', {
		//Vinculada en db.js por ser una FK
		//idProduct

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
