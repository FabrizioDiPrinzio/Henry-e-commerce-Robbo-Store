const express = require('express');
const router = express.Router();
const category = require('./category'); // rutas
const {Product, Categories, product_categories, Pics, Reviews} = require('../db.js'); //database


////<========= Esto lo quiero poner en review.js pero no pude!

//Obtener reviews
router.get('/:idProducto/review', (req, res) => {
	// Guard clauses
	//	if (!req.isAuthenticated()) return res.status(401).send('No estás logueado');

	const {idProducto} = req.params;
	Reviews.findAll({where: {productId : idProducto}})
		.then(data => {
			res.status(200).send(data)
		})
		.catch(error => {
			res.status(400).send('Algo salio mal ' + error)
		})
})

//Modificar reviews
router.put('/:idProducto/review/:idReview', async (req, res) => {
	// Guard clauses
	//	if (!req.isAuthenticated()) return res.status(401).send('No estás logueado');

	const {idProducto,idReview} = req.params;
	const {comment, qualification, creatorId} = req.body;

	if (!comment || !qualification) res.status(400).send('Tiene que llenar al menos un campo')

	const review = await Reviews.findOne({where: {id : idReview}})
		try {
			review.comment = comment ? comment : review.comment;
			review.qualification = qualification ? qualification : review.comment;
			await review.save()
			const savedReview = await review.reload()
			res.status(200).send(savedReview)
		}
		catch (error) {
			res.status(400).send('Algo salio mal ' + error.message)
		}
	})


//Crear review
router.post('/:idProducto/review', (req,res) => {
	// Guard clauses
	//	if (!req.isAuthenticated()) return res.status(401).send('No estás logueado');

	const {idProducto} = req.params
	const {comment, qualification, creatorId} = req.body

	Reviews.create({
		comment: comment,
		qualification: qualification,
		productId: idProducto,
		creatorId : creatorId
		})
		.then(data => {
				res.status(200).send('Creado!')
			})
		.catch(error => {
				res.status(400).send('Algo salio mal ' + error)
			})
});

//Borrar review

router.delete('/:idProducto/review/:idReview', (req,res) => {

//	if (!req.isAuthenticated()) return res.status(401).send('No estás logueado');

	const {idProducto, idReview} = req.params;
	Reviews.destroy({where: {id : idReview}})

		.then(response => {
			if (response === 0) res.status(400).send('Hubo un problema')
			res.status(200).send(`Review ${idReview} del producto ${idProducto} eliminada`);
		})
		.catch(error => {
			res.status(400).send('Algo salio mal ' + error);
		});
});




////<=======     hasta acá!



router.get('/', (req, res, next) => {
	Product.findAll({include: [Categories, Pics]})
		.then(products => {
			res.send(products);
		})
		.catch(next);
});

router.post('/', async (req, res) => {
	const {name, price, stock, image, description} = req.body;
	if (!name || !price || typeof stock !== 'number' || !image || !description)
		return res.status(400).send('Falta algún parámetro o stock typeof incorrecto');

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

	const {name, price, stock, description, image} = req.body;
	// const image = req.body.image ? req.body.image[0] : null;
	const {id} = req.params;

	if (!name && typeof price !== 'number' && typeof stock !== 'number' && !image && !description) {
		return res.status(400).send('Debes enviar al menos un parámetro para editar');
	}
	if(image[0] === undefined) {
		return res.status(400).send('El producto debe contener al menos una imagen');
	}

	const robot = await Product.findByPk(id);
	if (!robot) return res.status(400).send('No se encontró el robot :(');

	try {
		robot.name = name || robot.name;
		robot.description = description || robot.description;
		robot.price = price || robot.price;
		robot.stock = stock || stock === 0 ? stock : robot.stock;
		robot.image = image[0] || robot.image;
		if (image) {
		// 	await Pics.findOrCreate({where: {imageUrl: image, productId: robot.id}});
		// 	robot.image = image;
		await Pics.destroy({where: {productId: robot.id}});

			image.map(img => {
				Pics.create({imageUrl: img})
					.then(newPic => robot.addPic(newPic))
					.then(response => res.status(201).send(response));
			})
		}

		await robot.save();
		const savedRobot = await robot.reload();
		res.status(200).send(savedRobot);
	} catch (error) {
		res.status(400).send(error.message);
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

// router.get('/:idProducto/pics', (req, res) => {
//
// });
//
//
// router.put('/:idProducto/pics', (req, res) => {
//
// });

module.exports = router;
