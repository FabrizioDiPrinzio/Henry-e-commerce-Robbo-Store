const express = require('express');
// import all routers;
const productRouter = require('./product.js');
const {Product} = require('../db.js');
const {Op} = require('sequelize');

const category = require('./category.js');

const app = express();

// load each router on a route
// i.e: router.use('/auth', authRouter);
// app.use('/auth', authRouter);
app.use('/products', productRouter);
app.use('/products/category', category);

app.get('/', (req, res) => {
	res.send('Hola');
});

app.get('/search', (req, res) => {
	const {name, description} = req.query;
	Product.findAll({
		where: {
			[Op.or]: [
				{name: {[Op.iLike]: `%${name}%`}},
				{description: {[Op.iLike]: `%${description}%`}}
			]
		}
	})
		.then(response => {
			if (response.length <= 0)
				return res.status(404).send('No se encontró ningún robot de ese tipo :(');
			return res.send(response);
		})
		.catch(() => res.status(400));
});

module.exports = app;
