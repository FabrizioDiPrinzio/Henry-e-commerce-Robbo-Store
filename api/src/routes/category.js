const express = require('express');
const router = express.Router();
const {Categories} = require('../db.js');

/*
POST /products/category/
Crea una categoría nueva.

Story 07
*/
router.post('/', (req, res) => {
	const {name, description} = req.body;
	if (!name || !description)
		Categories.create(req.body)
			.then(res => res.status(201).send(response))
			.catch(err => res.status(400).send(err.message));
});

/*
DELETE /products/category/:id

Story 07
*/

module.exports = router;
