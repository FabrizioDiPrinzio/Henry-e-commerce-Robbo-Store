const {DataTypes} = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = sequelize => {
	// defino el modelo
	sequelize.define(
		'user',
		{
			//Vinculada en db.js por ser una FK
			//idReviews

			name: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					isString(value) {
						if (typeof value !== 'string') throw new Error('Name must be a string!!!!');
					}
				}
			},

			rol: {
				type: DataTypes.STRING,
				defaultValue: 'Client',
				validate: {
					isString(value) {
						if (value && typeof value !== 'string')
							throw new Error('Rol must be a string!!!!');
					}
				}
			},

			email: {
				type: DataTypes.STRING,
				unique: true,
				validate: {
					isEmail: true
				}
			},

			googleId: {
				type: DataTypes.STRING
			},

			githubId: {
				type: DataTypes.STRING
			},

			facebookId: {
				type: DataTypes.STRING
			},

			password: {
				type: DataTypes.STRING,
				get() {
					return () => this.getDataValue('password');
				}
			},

			salt: {
				type: DataTypes.STRING,
				get() {
					return () => this.getDataValue('salt');
				}
			},

			forgotPasswordToken: {
				type: DataTypes.STRING
			}
		},
		{
			validate: {
				OAuthOrPassword() {
					if (!this.googleId && !this.githubId && !this.facebookId && !this.password) {
						throw new Error('Si no iniciaste sesión con un tercero debes incluir una contraseña'); // prettier-ignore
					}
				},

				githubOrEmail() {
					if (!this.email && !this.githubId) {
						throw new Error('Debes proveer un email si no te autenticaste con Github');
					}
				}
			}
		}
	);
};
