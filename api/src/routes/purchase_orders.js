const express = require('express');
const router = express.Router();
const {Orderline, User, Purchase_order, Product} = require('../db.js');
const {Op} = require('sequelize');

// Cart es Purchase_order con status "enCarrito", purchase_orders son las que tienen cualquier otro estado

// queryString:  orders?status=[enCarrito, creada, pagada, entregada, cancelada]

router.get('/', (req, res) => {
	const {status} = req.query;

	Purchase_order.findAll({
		include: [{model: Orderline}, {model: Product}],
		where: status ? {status: {[Op.iLike]: status}} : {}
	}).then(response => {
		if (response.length <= 0) res.status(404).send('No hay órdenes de compra de ese tipo');
		else return res.send(response);
	});
});

router.get('/:id', (req, res) => {
	const {id} = req.params;

	console.log(id);

	Purchase_order.findByPk(id, [{model: Orderline}, {model: Product}])
		.then(response => {
			if (!response) return res.status(404).send('No se encontró la orden');
			else return res.send(response);
		})
		.catch(err => res.status(400).send(err.message));
});

router.get('/users/:id', (req, res) => {
	const {id} = req.params;

	Purchase_order.findAll({
		include: [{model: User, as: 'buyer', where: {id}}]
	})
		.then(response => {
			if (response.length <= 0)
				res.status(404).send('El usuario no dispone de órdenes de compra');
			else return res.send(response);
		})
		.catch(err => res.status(400).send(err.message));
});

router.put('/:id', async (req, res) => {
	const {id} = req.params;

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

	if (
		!status ||
		!recipient_name ||
		!recipient_lastname ||
		!country ||
		!city ||
		!address ||
		!postal_code ||
		!phone_number ||
		!shipping_type
	) {
		return res.status(400).send('Debes completar todos los campos para poder comprar!');
	}

	const order = await Purchase_order.findByPk(id);

	if (!order) return res.status(400).send('No se encontró la orden');

	try {
		order.status = status;
		order.recipient_name = recipient_name;
		order.recipient_lastname = recipient_lastname;
		order.country = country;
		order.city = city;
		order.address = address;
		order.postal_code = postal_code;
		order.phone_number = phone_number;
		order.shipping_type = shipping_type;
		await order.save();

		const savedOrder = await order.reload();
		return res.status(200).send(savedOrder);
	} catch (error) {
		return res.status(400).send(error.message);
	}
});

module.exports = router;
