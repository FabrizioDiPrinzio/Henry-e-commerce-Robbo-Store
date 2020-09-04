const express = require('express');
const router = express.Router();
const category = require('./category'); // rutas
const {Product, Categories, product_categories, Pics} = require('../db.js'); //database

router.get('/', (req, res, next) => {
	Product.findAll()
		.then(products => {
			res.send(products);
		})
		.catch(next);
});

router.post('/', async (req, res) => {
	const {name, price, stock, image, description} = req.body;
	if (!name || !price || !stock || !image || !description ) return res.sendStatus(400);
	
	const newBody = {
		...req.body,
		image: image[0]
	}

	try {
		let newProduct = await Product.create(newBody)
		image.map(img => {
			Pics.create({imageUrl: img})
			.then(newPic => newProduct.addPic(newPic))
			.then(response => res.status(201).send(response))
		} )
	}
	catch (error) { res.status(400).send(error.message)}

});

router.get('/:id', (req, res) => {
	const {id} = req.params;

	Product.findAll({where: {id}, include: [Categories]}).then(robot => res.send(robot));
});

router.delete('/:id', (req, res) => {
	const {id} = req.params;

	Product.destroy({where: {id}}).then(response => {
		if (response === 0) return res.sendStatus(404);
		else return res.sendStatus(200);
	});
});

router.put('/:id', (req, res) => {
	const {name, price, stock, image, description} = req.body;
	const {id} = req.params;

	if (!name && !price && !stock && !image && !description)
		return res.status(400).send('faltan parametros');
	else {
		Product.findByPk(id)
			.then(robot => {
				if (!robot) return res.status(400).send('No se encontró el robot :(');

				robot.name = name ? name : robot.name;
				robot.save();
				robot.image = image ? image : robot.image;
				robot.save();
				robot.description = description ? description : robot.description;
				robot.save();
				robot.price = price ? price : robot.price;
				robot.save();
				robot.stock = stock ? stock : robot.stock;
				robot.save();

				return res.send(robot);
			})
			.catch(err => res.status(400).send(err.message));
	}
});

router.post('/:idProducto/category/:idCategoria', async (req, res) => {
	const {idProducto, idCategoria} = req.params;
	const producto = await Product.findByPk(idProducto);
	const categoria = await Categories.findByPk(idCategoria);

	producto
		.addCategory(categoria)
		.then(() => {
			categoria.addProduct(producto);
		})
		.then(() => Product.findAll({where: {id: idProducto}, include: [Categories]}))
		.then(response => res.send(response));
});

router.delete('/:idProducto/category/:idCategoria', (req, res) => {
	const {idProducto, idCategoria} = req.params;

	product_categories
		.destroy({where: {productId: idProducto, categoryId: idCategoria}})
		.then(() => res.sendStatus(200));
});

module.exports = router;
