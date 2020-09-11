const express = require('express');
const router = express.Router();
const {User, Purchase_order, Orderline} = require('../db.js'); //database

router.get('/', async (req, res) => {
	const userList = await User.findAll();
	res.send(userList);
});

router.get('/:id', (req, res) => {
	User.findByPk(req.params.id, {include: Orderline}).then(user => {
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
		include: Orderline
	}).then(response => {
		if (!response) return res.status(404).send('No se encontró el carrito de ese usuario');
		else return res.send(response);
	});
});

router.post('/:userId/cart', (req, res) => {
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

	Purchase_order.findOne({where: {buyerId: userId, status: 'enCarrito'}})
		.then(response => {
			if (response) return res.status(400).send('El usuario todavía tiene un carrito abierto');
		})
		.catch(err => {
			return res.status(400).send('Algo salió mal: ' + err.message);
		});

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
		{include: [{model: User, as: 'buyer'}]}
	)
		.then(response => {
			return res.send(response);
		})
		.catch(err => res.status(400).send('Algo salió mal: ' + err.message));
});

router.put('/:userId/cart', async (req, res) => {
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
		shipping_type,
		orderlineChanges
	} = req.body;

	if (
		!status &&
		!recipient_name &&
		!recipient_lastname &&
		!country &&
		!city &&
		!address &&
		!postal_code &&
		!phone_number &&
		!shipping_type &&
		!orderlineChanges
	) {
		return res.status(400).send('Debes enviar al menos un campo para editar');
	}

	const order = await Purchase_order.findOne({
		where: {buyerId: userId, status: 'enCarrito'},
		include: Orderline
	});

	if (!order) return res.status(404).send('No se encontró el carrito del usuario');

	try {
		if (orderlineChanges && orderlineChanges.length > 0) {
			await Promise.all(
				orderlineChanges.map(async change => {
					const {productId, quantity, price} = change;

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

					return currentOrder;
				})
			);
		}

		order.status = status || order.status;
		order.recipient_name = recipient_name || order.recipient_name;
		order.recipient_lastname = recipient_lastname || order.recipient_lastname;
		order.country = country || order.country;
		order.city = city || order.city;
		order.address = address || order.address;
		order.postal_code = postal_code || order.postal_code;
		order.phone_number = phone_number || order.phone_number;
		order.shipping_type = shipping_type || order.shipping_type;

		await order.save();
		await order.reload();

		return res.send(order);
	} catch (error) {
		return res.status(400).send('Algo salió mal: ' + error.message);
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
