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
	if (!name || !price || !stock || !image || !description) return res.sendStatus(400);

	const newBody = {
		...req.body,
		image: image[0]
	};

	try {
		let newProduct = await Product.create(newBody);
		image.map(img => {
			Pics.create({imageUrl: img})
				.then(newPic => newProduct.addPic(newPic))
				.then(response => res.status(201).send(response));
		});
	} catch (error) {
		res.status(400).send(error.message);
	}
});

router.get('/:id', (req, res) => {
	const {id} = req.params;

	Product.findOne({where: {id}, include: [Categories, Pics]}).then(robot => res.send(robot));
});

router.delete('/:id', (req, res) => {
	const {id} = req.params;

	Product.destroy({where: {id}, include: [Pics]}).then(response => {
		if (response === 0) return res.sendStatus(404);
		else return res.sendStatus(200);
	});
});

router.put('/:id', async (req, res) => {

	/*
	Esta ruta SOLO cambia la image principal del producto,
	NO agrega nuevas fotos asociadas al producto.

	Esto es así porque debemos crear un formulario CRUD de Pics
	donde se puedan guardar nuevas fotos, editarlas y eliminarlas.

	Hacer todo eso en esta ruta sería muy complejo y lo único que
	permitiremos es cambiar la image del producto (la image principal).

	Las rutas de products reciben en image un array por convención, ya que
	en algúnas es posible o necesario manejar más de una imágen.
	*/

	const {name, price, stock, description} = req.body;
	const image = req.body.image[0]
	const {id} = req.params;

	if (!name && !price && !stock && !image && !description)
		return res.status(400).send('Debes enviar al menos un parametro para editar');

	const robot = await Product.findByPk(id);
	if (!robot) return res.status(400).send('No se encontró el robot :(');

	try {
		robot.name = name ? name : robot.name;
		robot.description = description ? description : robot.description;
		robot.price = price ? price : robot.price;
		robot.stock = stock ? stock : robot.stock;
		if (image) {
			await Pics.findOrCreate({where: {imageUrl: image, productId: robot.id}})
			robot.image = image;
		}
		await robot.save();
	} catch (error) {
  		res.status(400).send(error.message);
	} finally {
		const savedRobot = await robot.reload()
  		res.status(200).send(savedRobot);
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
