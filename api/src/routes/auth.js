const express = require('express');
const router = express.Router();
const passport = require('passport');
const {User} = require('../db');

router.post('/login', passport.authenticate('local'), (req, res) => {
	res.send(req.user);
});

router.post('/logout', (req, res) => {
	if (req.isAuthenticated()) {
		req.logout();
		res.sendStatus(200);
	}
	else res.status(400).send('No estabas logeado :/');
});

router.get('/me', (req, res) => {
	if (req.isAuthenticated()) return res.send(req.user);
	else return res.status(401).send('No estás logeado');
});

router.post('/promote/:id', async (req, res) => {
	const {id} = req.params;

	// Guard clauses
	if (!req.isAuthenticated()) return res.status(401).send('No estás logueado');
	if (req.user.rol !== 'Admin') return res.status(401).send('No eres admin');

	const user = await User.findByPk(id);

	if (!user) return res.status(404).send('No se encontró el usuario.');
	else if (user.rol === 'Client') user.rol = 'Admin';
	await user.save();

	return res.send(`${user.name} ahora es un admin`);
});

router.post('/demote/:id', async (req, res) => {
	const {id} = req.params;

	// Guard clauses
	if (!req.isAuthenticated()) return res.status(401).send('No estás logueado');
	if (req.user.rol !== 'Admin') return res.status(401).send('No eres admin');

	const user = await User.findByPk(id);

	if (!user) return res.status(404).send('No se encontró el usuario.');
	else if (user.rol === 'Admin') user.rol = 'Client';
	await user.save();

	return res.send(`${user.name} ahora es un cliente`);
});

module.exports = router;
