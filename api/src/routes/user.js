const express = require('express');
const router = express.Router();
const {User, Purchase_order, Orderline, Product} = require('../db.js'); //database

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

				user.name = name || user.name;
				user.rol = rol || user.rol;
				user.email = email || user.rol;
				user.password = password || user.password;
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

// Rutas de cart
// Cart es Purchase_order con status "enCarrito", purchase_orders son las que tienen cualquier otro estado
// Ruta para agregar Item al Carrito

router.get('/:userId/cart', (req, res) => {
	const {userId} = req.params;

	Purchase_order.findOne({
		where: {buyerId: userId, status: 'enCarrito'},
		include: [{model: Orderline}, {model: Product}]
	}).then(response => {
		if (!response) return res.status(404).send('No se encontró el carrito de ese usuario');
		else return res.send(response);
	});
});

router.post('/:userId/cart', async (req, res) => {
	const {userId} = req.params;
	const {
		status,
		recipient_name,
		recipient_lastname,
		country,
		city,
		address,
		postal_code,
		phone_number,
		shipping_type
	} = req.body;

	const userHasCart = await Purchase_order.findOne({
		where: {buyerId: userId, status: 'enCarrito'}
	});

	if (userHasCart) return res.status(400).send('El usuario todavía tiene un carrito abierto');

	Purchase_order.create(
		{
			buyerId: userId,
			status,
			recipient_name,
			recipient_lastname,
			country,
			city,
			address,
			postal_code,
			phone_number,
			shipping_type
		},
		{include: [{model: User, as: 'buyer'} /* , {model: Product}, {model: Orderline} */]}
	)
		.then(response => {
			return res.send(response);
		})
		.catch(err => res.status(400).send('Algo salió mal: ' + err.message));
});

router.put('/:userId/cart', async (req, res) => {
	const {userId} = req.params;
	const {productId, quantity, price} = req.body;

	if (!productId) {
		return res.status(400).send('Debes indicar el producto a editar');
	}

	const order = await Purchase_order.findOne({
		where: {buyerId: userId, status: 'enCarrito'},
		include: Orderline
	});

	if (!order) return res.status(400).send('No se encontró el carrito del usuario');

	try {
		const [currentOrder, created] = await Orderline.findOrCreate({
			where: {productId, purchaseOrderId: order.id},
			defaults: {quantity, price}
		});

		if (!created) {
			if (quantity === 0) currentOrder.destroy();
			else {
				currentOrder.quantity = quantity || currentOrder.quantity;
				currentOrder.price = price || currentOrder.price;

				await currentOrder.save();
				await currentOrder.reload();
			}
		}

		await order.save();
		await order.reload();

		return res.send(order);
	} catch (error) {
		return res.status(405).send('Algo salió mal: ' + error.message);
	}
});

router.delete('/:userId/cart', (req, res) => {
	const {userId} = req.params;

	Purchase_order.destroy({where: {buyerId: userId, status: 'enCarrito'}})
		.then(response => {
			if (!response) return res.status(404).send('No se encontró el carrito');
			else return res.send('Carrito eliminado con éxito');
		})
		.catch(err => res.status(400).send('Algo salió mal: ' + err.message));
});

module.exports = router;
