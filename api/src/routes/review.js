const express = require('express');
const router = express.Router();
const {Product, User, Reviews} = require('../db.js'); //database

// router.post('/:idProducto/review', async (req,res) => {
// 	const {idProducto} = req.params
// 	const {commentary, qualification, creatorId} = req.body
	
// 	Reviews.create({
// 		commentary: commentary,
// 		qualification: qualification,
// 		productId: idProducto,
// 		creatorId : creatorId
// 		})
// 		.then(data => {
// 				res.status(200).send('Creado!')
// 			})
// 		.catch(error => {
// 				res.status(400).send('Algo salio mal' + error)
// 			})
// });


module.exports = router;
