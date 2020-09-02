require('dotenv').config(); //Es la forma de requerir el archivo .env//
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/development`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Product, OrderLine, Categories, User, Reviews,Purchase_order, Product_Categories } = sequelize.models;


// Aca vendrian las relaciones

Purchase_order.hasMany(Product, { through: 'OrderLine'}); 
Product.belongsToMany(Purchase_order,{through:'OrderLine'}); 
// OrderLine.hasOne(Product);
// OrderLine.belongsTo(Purchase_order, {as: 'cart'});

Purchase_order.belongsTo(User,{ as: 'buyer'});
Purchase_order.hasMany (OrderLine);  

Reviews.belongsTo(User ,{as: 'creator'});
Reviews.belongsTo(Product);

User.hasMany(Reviews);
Product.hasMany(Reviews);

Product.belongsToMany(Categories, { through: 'Product_categories'}); 
Categories.belongsToMany(Product, { through:'Product_categories' });
//Categories.hasMany(Product);


module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
