const express = require('express');
const router = express.Router();
const {Categories} = require('../db.js');

router.post('/', (req, res) => {
	const {name, description} = req.body;
	if (!name || !description)
		Categories.create(req.body)
			.then(res => res.status(201).send(response))
			.catch(err => res.status(400).send(err.message));
});


router.delete('/:id', (req, res) => {
	const {id} = req.params;

	Categories.destroy({where: {id}}).then(response => {
		if (response === 0) return res.sendStatus(404);
		else return res.sendStatus(200);
	});
})


router.put('/:id', (req, res) => {
	const {name, description} = req.body;
	const {id} = req.params;

	if (!name || !description) return res.sendStatus(400);
	else {
		Categories.findByPk(id)
			.then(category => {
				if (!category) return res.status(400).send('No se encontró la categoria :(');

				category.name = name ? name : category.name;
				category.description = description ? description : category.desciription;
				category.save();

				return res.send(category);
			})
			.catch(err => res.status(400).send(err.message));
	}
});


module.exports = router;