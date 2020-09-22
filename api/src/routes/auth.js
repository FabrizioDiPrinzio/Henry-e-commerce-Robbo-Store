const express = require('express');
const router = express.Router();
const passport = require('passport');
const {User} = require('../db');

// Local login
router.post('/login', passport.authenticate('local'), (req, res) => {
	res.send(req.user);
});

// Google login
router.get(
	'/google',
	passport.authenticate('google', {
		scope: ['profile', 'email']
	})
);

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
	console.log('reached redirect');
	res.redirect('http://localhost:3000');
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

// El usuario solicita el email para resetear la contraseña
router.post('/forgot', async (req, res) => {
	const {email} = req.body;

	try {
		const user = await User.findOne({where: {email}});
		if (!user) return res.status(404).send('No hay usuarios registrados con ese email');

		const salt = await User.generateSalt();

		user.forgotPasswordToken = salt;
		await user.save();

		setTimeout(() => {
			user.forgotPasswordToken = null;
			user.save();
		}, 3600000); // Caduca en una hora

		return res.send(salt);
	} catch (error) {
		return res.sendStatus(500);
	}
});

// El usuario resetea la contraseña
router.patch('/reset', async (req, res) => {
	const {email, password, token} = req.body;

	if (!email || !password || !token) return res.status(400).send('Faltan parámetros');

	try {
		const user = await User.findOne({where: {email, forgotPasswordToken: token}});
		if (!user) return res.status(400).send('Token inválida');

		user.password = password;
		user.forgotPasswordToken = null;
		await user.save();

		return res.status(200).send('Contraseña actualizada con éxito');
	} catch (error) {
		res.status(500).send(error);
	}
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
