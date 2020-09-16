require('dotenv').config(); //Es la forma de requerir el archivo .env//
const {Sequelize} = require('sequelize');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const {DB_USER, DB_PASSWORD, DB_HOST} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/development`, {
	logging: false, // set to console.log to see the raw SQL queries
	native: false // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs
	.readdirSync(path.join(__dirname, '/models'))
	.filter(file => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
	.forEach(file => {
		modelDefiners.push(require(path.join(__dirname, '/models', file)));
	});

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map(entry => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const {Product, Pics, Orderline, Categories, User, Reviews, Purchase_order} = sequelize.models;

// Aca vendrian las relaciones

Purchase_order.belongsToMany(Product, {through: Orderline});
Product.belongsToMany(Purchase_order, {through: Orderline});

Purchase_order.belongsTo(User, {as: 'buyer'});
Purchase_order.hasMany(Orderline);

Reviews.belongsTo(User, {as: 'creator'});
Reviews.belongsTo(Product);

User.hasMany(Reviews);
Product.hasMany(Reviews);

Product.hasMany(Pics, {onDelete: 'CASCADE'});
Pics.belongsTo(Product);

Product.belongsToMany(Categories, {through: 'product_categories'});
Categories.belongsToMany(Product, {through: 'product_categories'});
// Categories.hasMany(Product);

// ======== User instance and class method declaration: ============== //

// encrypting password:

// generates a random salt (salt is a random string)
User.generateSalt = function() {
	return crypto.randomBytes(16).toString('base64');
};

// uses crypto and a salt to encrypt a plain text
User.encryptPassword = function(plainText, salt) {
	return crypto.createHash('sha1').update(plainText).update(salt).digest('hex');
};

// A hook that uses the two previous functions to encrypt the password and saves the random salt
const setSaltAndPassword = user => {
	if (user.changed('password')) {
		user.salt = User.generateSalt();
		user.password = User.encryptPassword(user.password(), user.salt());
	}
};

// tells the model to use the encrypting functiong when an instace is created or updated.
User.beforeCreate(setSaltAndPassword);
User.beforeUpdate(setSaltAndPassword);

// Model instance to compare encrypted passwod with the entered password.
User.prototype.correctPassword = function(enteredPassword) {
	return User.encryptPassword(enteredPassword, this.salt()) === this.password();
};

// ================= Exporting the models =============== //

module.exports = {
	...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
	conn: sequelize // para importart la conexión { conn } = require('./db.js');
};
