const express = require('express');
const router = express.Router();
const {Product, User, Reviews} = require('../db.js'); //database

/*
router.post('/:idProducto/review', async (req,res) => {

//	if (!req.isAuthenticated()) return res.status(401).send('No estás logueado');

	const {idProducto} = req.params
	const {commentary, qualification, creatorId} = req.body
	
	Reviews.create({
		commentary: commentary,
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


*/

module.exports = router;
