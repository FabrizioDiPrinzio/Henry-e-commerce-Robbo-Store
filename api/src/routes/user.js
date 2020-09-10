const express = require('express');
const router = express.Router();
const {User} = require('../db.js'); //database

router.get('/', async (req, res) => {
	const userList = await User.findAll();
	res.send(userList);
});

router.get('/:id', (req, res) => {
	User.findByPk(req.params.id).then(user => {
		if (!user) res.status(404).send('No se encontró el usuario');
		res.send(user);
	});
});

//Ruta para crear Usuario
router.post('/signup', (req, res) => {
	const {name, rol, email, password} = req.body;
	if (!name && !rol && !email && !password) {
		return res.status(400).send('Falta algún parámetro');
	}
	else {
		User.create(req.body)
			.then(response => {
				return res.status(201).send(response);
			})
			.catch(err => {
				return res.status(400).send(err.message);
			});
	}
});

router.put('/:id', (req, res) => {
	const {name, rol, email, password} = req.body;
	const {id} = req.params;

	if (!name && !rol && !email && !password) return res.status(400).send('faltan parametros');
	else {
		User.findByPk(id)
			.then(user => {
				if (!user) return res.status(400).send('No se encontró el usuario:(');

				user.name = name ? name : user.name;
				user.rol = rol ? rol : user.rol;
				user.email = email ? email : user.rol;
				user.password = password ? password : user.password;
				user.save();

				return user;
			})
			.then(user => {
				user.reload();
				return user;
			})
			.then(user => res.send(user))
			.catch(err => res.status(400).send(err.message));
	}
});

router.delete('/:id', (req, res) => {
	let {id} = req.params;
	id = parseInt(id);

	User.destroy({where: {id}}).then(response => {
		if (response === 0) return res.sendStatus(404);
		else return res.sendStatus(200);
	});
});

//rutas de cart

module.exports = router;
