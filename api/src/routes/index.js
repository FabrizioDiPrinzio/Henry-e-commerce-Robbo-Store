const express = require('express');
const passport = require('passport');
// import all routers;
const productRouter = require('./product.js');
const user = require('./user.js');
const purchase_orders = require('./purchase_orders.js');
const category = require('./category.js');
const {Product, User} = require('../db.js');
const {Op} = require('sequelize');

const app = express();

// load each router on a route
// i.e: router.use('/auth', authRouter);s
// app.use('/auth', authRouter);
app.use('/products', productRouter);
app.use('/products/category', category);
app.use('/user', user);
app.use('/orders', purchase_orders);

app.get('/', (req, res) => {
	res.send('Hola');
});

app.get('/search', (req, res) => {
	const {query} = req.query;
	Product.findAll({
		where: {
			[Op.or]: [{name: {[Op.iLike]: `%${query}%`}}, {description: {[Op.iLike]: `%${query}%`}}]
		}
	})
		.then(response => {
			if (response.length <= 0)
				return res.status(404).send('No se encontró ningún robot de ese tipo :(');
			return res.send(response);
		})
		.catch(() => res.status(400).send('Algo salió mal'));
});






// Login routes

// PLACEHOLDER ONLY!!! These routes don't do any authentication.

app.post('/auth/login', async (req, res) => {
	const {email, password} = req.body;

	try {
		const usuario = await User.findOne({where: {email}});

		if (!usuario || !usuario.correctPassword(password)) {
			return res.status(400).send('El email o la contraseña son incorrectos.');
    }
    
    passport.authenticate('local', 
    { failureFlash: false })

		return res.send(usuario);
	} catch (error) {
		return res.status(400).send('El email o la contraseña son incorrectos.');
	}
});


app.get('/auth/logout',
  function(req, res){
    req.logout();
    res.redirect('/');
});

app.get('/auth/me',
  passport.authenticate('local', { session: true }),
  function(req, res) {
    res.json({ user: req.user });
});




module.exports = app;
