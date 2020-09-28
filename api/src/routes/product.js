const express = require('express');
const router = express.Router();
const {Product, Categories, product_categories, Pics, Reviews, User} = require('../db.js'); //database

router.get('/', (req, res, next) => {
	Product.findAll({include: [Categories, Pics]})
		.then(products => {
			res.send(products);
		})
		.catch(next);
});

//paginación

router.get('/pag/', (req, res, next) => {
	const {p} = req.query;
	const firstIndex = (p - 1) * 2;
	const lastIndex = firstIndex + 2;
	Product.findAll({order: [[ 'updatedAt', 'DESC']], include: [Categories, Pics] }).then(data => {
		const productos = data.slice(firstIndex, lastIndex);
		const result = {
			data: productos,
			currentPage: p,
			more: productos.length > 0 ? true : false
		};
		res.send(result);
	});
});

// Top 5 products

router.get('/bestOnes', (req, res, next) => {
	Product.findAll({ order: [ ['averageQualification', 'DESC'] ], limit: 5 })
	.then(response => {
		res.send(response)
	}).catch(err => {
		res.status(500).send(err)
	})
})


router.post('/', async (req, res) => {
	//Guard Clauses
	if (!req.isAuthenticated()) return res.status(401).send('No estás logueado');
	if (req.user.rol !== 'Admin') return res.status(401).send('No eres admin');

	const {name, price, stock, description, images, mainImage} = req.body;
	if (!name || !price || typeof stock !== 'number' || !description || !images || !mainImage)
		return res.status(400).send('Falta algún parámetro');

	const newBody = {
		...req.body,
		image: mainImage
	};

	try {
		let newProduct = await Product.create(newBody);
		images.map(img => {
			Pics.create({imageUrl: img})
				.then(newPic => newProduct.addPic(newPic))
				.then(response => res.status(201).send(response));
		});
	} catch (error) {
		res.status(400).send(error.message);
	}
});

router.put('/:id', async (req, res) => {
	//Guard Clauses
	if (!req.isAuthenticated()) return res.status(401).send('No estás logueado');
	if (req.user.rol !== 'Admin') return res.status(401).send('No eres admin');

	const {name, price, stock, description, images, mainImage} = req.body;
	// const image = req.body.image ? req.body.image[0] : null;
	const {id} = req.params;

	if (
		!name &&
		typeof price !== 'number' &&
		typeof stock !== 'number' &&
		!images &&
		!mainImage &&
		!description
	) {
		return res.status(400).send('Debes enviar al menos un parámetro para editar');
	}
	if (!images[0]) {
		return res.status(400).send('El producto debe contener al menos una imagen');
	}

	const robot = await Product.findByPk(id);
	if (!robot) return res.status(400).send('No se encontró el robot :(');

	try {
		robot.name = name || robot.name;
		robot.description = description || robot.description;
		robot.price = price || robot.price;
		robot.stock = stock || stock === 0 ? stock : robot.stock;
		robot.image = mainImage || robot.image;
		if (images) {
			await Pics.destroy({where: {productId: robot.id}});

			images.map(img => {
				Pics.create({imageUrl: img})
					.then(newPic => robot.addPic(newPic))
					.then(response => res.status(201).send(response));
			});
		}

		await robot.save();
		const savedRobot = await robot.reload();
		res.status(200).send(savedRobot);
	} catch (error) {
		res.status(400).send(error.message);
	}
});

router.put('/:id/stockChange', async (req, res) => {

	if (!req.isAuthenticated()) return res.status(401).send('No estás logueado');
	if (req.user.rol !== 'Admin') return res.status(401).send('No eres admin');

	const {id} = req.params;

	const {stockChange, type} = req.body;
	if (!stockChange && !type) return res.status(500).send('faltan parametros')

	const robot = await Product.findByPk(id);
	if (!robot) return res.status(400).send('No se encontró el robot :(');	

	try {
		
		switch (type) {
			case 'add':
				robot.stock = robot.stock + Number(stockChange);
				break;
			case 'substract':
				robot.stock = robot.stock - Number(stockChange);
				break;
		}

		if (robot.stock < 0) return res.status(400).send('No hay suficiente stock :(')

		await robot.save();

	} catch(error) {
		res.status(500).send(error.message)
	}

	await robot.reload();
	return res.send(robot);
})

router.get('/:id', (req, res) => {
	const {id} = req.params;

	Product.findOne({where: {id}, include: [Categories, Pics]}).then(robot => res.send(robot));
});

router.delete('/:id', (req, res) => {
	//Guard Clauses
	if (!req.isAuthenticated()) return res.status(401).send('No estás logueado');
	if (req.user.rol !== 'Admin') return res.status(401).send('No eres admin');

	const {id} = req.params;

	Product.destroy({where: {id}, include: [Pics]}).then(response => {
		if (response === 0) return res.sendStatus(404);
		else return res.sendStatus(200);
	});
});

router.post('/:idProducto/category/:idCategoria', async (req, res) => {
	//Guard Clauses
	if (!req.isAuthenticated()) return res.status(401).send('No estás logueado');
	if (req.user.rol !== 'Admin') return res.status(401).send('No eres admin');

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
	//Guard Clauses
	if (!req.isAuthenticated()) return res.status(401).send('No estás logueado');
	if (req.user.rol !== 'Admin') return res.status(401).send('No eres admin');

	const {idProducto, idCategoria} = req.params;

	product_categories
		.destroy({where: {productId: idProducto, categoryId: idCategoria}})
		.then(() => res.sendStatus(200));
});

// =================================== Reviews =================================== //

//Obtener reviews
router.get('/:productId/review', (req, res) => {
	const {productId} = req.params;

	Reviews.findAll({where: {productId}, include: {model: User, as: 'creator'}})
		.then(data => {
			if (!data) return res.status(404).send('El producto no tiene ninguna reseña');
			else return res.send(data);
		})
		.catch(error => {
			return res.status(400).send(error.message);
		});
});

//Crear review
router.post('/:productId/review', async (req, res) => {
	const {productId} = req.params;
	const {comment, qualification, creatorId} = req.body;

	// Guard clauses
	if (!req.isAuthenticated()) return res.status(401).send('No estás logueado');

	const yaExiste = await Reviews.findOne({where: {creatorId, productId}});

	if (yaExiste) return res.status(400).send('Solo puedes crear una reseña por producto');

	Reviews.create({comment, qualification, productId, creatorId})
		.then(data => {
			res.status(200).send(data);
		})
		.catch(error => {
			res.status(400).send('Algo salio mal ' + error.message);
		});
});

//Modificar reviews
router.put('/:productId/review/:idReview', async (req, res) => {
	const {productId, idReview} = req.params;
	const {comment, qualification, creatorId} = req.body;

	// Guard clauses
	if (!req.isAuthenticated()) return res.status(401).send('No estás logueado');
	if (!comment || !qualification) {
		return res.status(400).send('Tiene que llenar al menos un campo');
	}

	const review = await Reviews.findOne({where: {id: idReview, productId, creatorId}});

	if (!review) return res.status(404).send('No encontramos la reseña');

	try {
		review.comment = comment || review.comment;
		review.qualification = qualification || review.qualification;
		await review.save();

		return res.send(review);
	} catch (error) {
		return res.status(400).send('Algo salio mal ' + error.message);
	}
});

//Borrar review

router.delete('/:productId/review/:idReview', async (req, res) => {
	if (!req.isAuthenticated()) return res.status(401).send('No estás logueado');

	const {productId, idReview} = req.params;

	try {
		const review = await Reviews.findOne({where: {id: idReview, productId}});

		if (!review) return res.status(404).send('No encontramos la review');
		if (req.user.rol !== 'Admin' && review.creatorId !== req.user.id) {
			return res.status(400).send('No puedes borrar la review de otra persona');
		}

		await review.destroy();

		return res.send('Review eliminada');
	} catch (error) {
		return res.status(400).send(error.message);
	}
});

module.exports = router;
