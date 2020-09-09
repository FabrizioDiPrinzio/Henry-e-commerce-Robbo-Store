const express = require('express');
const router = express.Router();
const {Orderline, User, Purchase_Order} = require('../db.js');
const {Op} = require('sequelize');

// queryString:  orders?status=[enCarrito, creada, procesando, cancelada, completa]

router.get('/', (req, res) => {
	const {status} = req.query;

	Purchase_Order.findAll(status ? {where: {status}} : {}).then(response => {
		if (response.length <= 0) res.status(404).send('No hay órdenes de compra de ese tipo');
		else return res.send(response);
	});
});

router.get('/:id', (req, res) => {
	const {id} = req.params;

	Purchase_Order.findByPk({where: {id}}).then(response => {
		res.send(response);
	});
});

router.get('/users/:id', (req, res) => {
	const {id} = req.params;

	Purchase_Order.findAll({
		include: [{model: User, where: {id}}]
	}).then(response => {
		if (response.length <= 0) res.status(404).send('El usuario no dispone de Órdenes de compra');
		else return res.send(response);
	});
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
		!status &&
		!recipient_name &&
		!recipient_lastname &&
		!country &&
		!city &&
		!address &&
		!postal_code &&
		!phone_number &&
		!shipping_type
	) {
		return res.status(400).send('Debes enviar al menos un campo para editar');
	}

	const order = await Purchase_Order.findByPk({where: {id}});

	if (!order) return res.status(400).send('No se encontró la orden');

	try {
		order.status = status ? status : order.status;
		order.recipient_name = recipient_name ? recipient_name : order.recipient_name;
		order.recipient_lastname = recipient_lastname ? recipient_lastname : order.recipient_lastname;
		order.country = country ? country : order.country;
		order.city = city ? city : order.city;
		order.address = address ? address : order.address;
		order.postal_code = postal_code ? postal_code : order.postal_code;
		order.phone_number = phone_number ? phone_number : order.phone_number;
		order.shipping_type = shipping_type ? shipping_type : order.shipping_type;
		await order.save();
	} catch (error) {
		return res.status(400).send(error.message);
	} finally {
		const savedOrder = await order.reload();
		res.status(200).send(savedOrder);
	}
});

module.exports = router;
