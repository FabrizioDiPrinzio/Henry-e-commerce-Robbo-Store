const express = require('express');
const router = express.Router();
const {Product, User, Reviews} = require('../db.js'); //database

// router.post('/:idProducto/review', async (req,res) => {
// 	const {idProducto} = req.params
// 	const {commentary, qualification, creatorId} = req.body
// 	const producto = await Product.findByPk(idProducto)

// 	try {
// 		Reviews.create({commentary: commentary, qualification: qualification, productId: idProducto, creatorId : creatorId})
// 		.then(data => {
// 			const review = await Reviews.findOne({where: commentary: commentary})
// 			try {
// 				producto.addReview(review)
// 				res.status(200).send('Creado!')
// 			}
		
// 		})
// 		.catch(error => {
// 			res.status(400).send(('algo salio mal' + error))
// 		})
// 	}
// 	catch {
// 		res.status(400).send(error.message)
// 	}
// });

module.exports = router;
