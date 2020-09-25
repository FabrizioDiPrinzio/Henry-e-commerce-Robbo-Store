const express = require('express');
const router = express.Router();
const {Categories, Product} = require('../db.js');
const {Op} = require('sequelize');

router.get('/names', (req, res) => {
	Categories.findAll().then(response => res.send(response)).catch(err => {
		return res.status(400).send(err.message);
	});
});

router.post('/', (req, res) => {
	const {name, description} = req.body;

	if (!req.isAuthenticated()) return res.status(401).send('No estás logueado');
	if (req.user.rol !== 'Admin') return res.status(401).send('No eres admin');

	if (!name || !description) {
		return res.status(400).send('Parámetros incompletos');
	}
	else {
		Categories.create(req.body)
			.then(response => {
				return res.status(201).send(response);
			})
			.catch(err => {
				return res.status(400).send(err.message);
			});
	}
});

router.delete('/:id', (req, res) => {
	let {id} = req.params;
	id = parseInt(id);

	if (!req.isAuthenticated()) return res.status(401).send('No estás logueado');
	if (req.user.rol !== 'Admin') return res.status(401).send('No eres admin');

	Categories.destroy({where: {id}}).then(response => {
		if (response === 0) return res.sendStatus(404);
		else return res.sendStatus(200);
	});
});

router.put('/:id', (req, res) => {
	const {name, description} = req.body;
	const {id} = req.params;

	if (!req.isAuthenticated()) return res.status(401).send('No estás logueado');
	if (req.user.rol !== 'Admin') return res.status(401).send('No eres admin');

	if (!name && !description) return res.status(400).send('Faltan parámetros');
	else {
		Categories.findByPk(id)
			.then(category => {
				if (!category) return res.status(400).send('No se encontró la categoria :(');

				category.name = name || category.name;
				category.description = description || category.description;

				category.save();
				category.reload();

				return res.send(category);
			})
			.catch(err => res.status(400).send(err.message));
	}
});

router.get('/:nombreCategoria/', (req, res) => {
	const name = decodeURI(req.params.nombreCategoria);
	const  {p} = req.query
	const firstIndex = (p - 1) * 2;
	const lastIndex = firstIndex + 2;
	Categories.findOne({where: {name: {[Op.iLike]: name}}, include: [Product]}).then(response => {
		let productos = response.products
		let pagina = productos.slice(firstIndex, lastIndex);
		let result = {
			currentPage: productos.length > 0 ? p : p - 1,
			products : pagina
		}
		res.send(result)
	})
});

module.exports = router;
