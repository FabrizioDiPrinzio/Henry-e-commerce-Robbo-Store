const express = require('express');
const router = express.Router();
const passport = require('passport');
// const {Product, User} = require('../db.js');

router.post('/login', passport.authenticate('local'), (req, res) => {
	res.send(req.user);
});

router.post('/logout', (req, res) => {
	if (req.isAuthenticated()) {
		req.logout();
		res.redirect('/authenticated');
	}
	else res.redirect('/notAuthenticated');
});

router.get('/me', (req, res) => {
	if (req.isAuthenticated()) return res.send(req.user);
	else return res.status(401).send('No estás logeado');
});

module.exports = router;
