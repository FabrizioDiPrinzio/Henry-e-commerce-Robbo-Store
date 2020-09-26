require('dotenv').config(); //Es la forma de requerir el archivo .env//
const express = require('express');
const router = express.Router();
const passport = require('passport');
const {User} = require('../db');

//Mailgun
const {mailgunApiKey, mailgunDomain} = process.env;
var mailgun = require('mailgun-js')({apiKey: mailgunApiKey, domain: mailgunDomain});

// Google login
router.get(
	'/google',
	passport.authenticate('google', {scope: ['profile', 'email'], display: 'popup'})
);

router.get(
	'/google/redirect',
	passport.authenticate('google', {successRedirect: 'http://localhost:3000/oauth/success'})
);

// Github login
router.get('/github', passport.authenticate('github', {scope: ['user:email'], display: 'popup'}));

router.get(
	'/github/redirect',
	passport.authenticate('github', {successRedirect: 'http://localhost:3000/oauth/success'})
);

// Facebook login
router.get('/facebook', passport.authenticate('facebook', {scope: ['email'], display: 'popup'}));

router.get(
	'/facebook/redirect',
	passport.authenticate('facebook', {successRedirect: 'http://localhost:3000/oauth/success'})
);

// Local login
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

		const data = {
			from: 'RobboStore <sanchezlismairy@gmail.com>',
			to: email,
			subject: 'Reseteo de Password',
			text: `http://localhost:3000/reset/${salt}`,
			template: 'password'
		};

		mailgun.messages().send(data, function(error, body) {
			if (error) {
				console.log({error});
				return res.status(200).send({salt, statusEmail: 'error'});
			}

			return res.status(200).send({salt, statusEmail: 'enviado'});
		});
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
