const express = require('express');
const router = express.Router();
const {Orderline, User, Purchase_order} = require('../db.js');
const {Op} = require('sequelize');

// queryString:  orders?status=[enCarrito, creada, procesando, cancelada, completa]

router.get('/', (req, res) => {
	const {status} = req.query;

	Purchase_order.findAll(status ? {where: {status: {[Op.iLike]: status}}} : {}).then(response => {
		if (response.length <= 0) res.status(404).send('No hay órdenes de compra de ese tipo');
		else return res.send(response);
	});
});

router.get('/:id', (req, res) => {
	const {id} = req.params;

	console.log(id);

	Purchase_order.findByPk(id)
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

	const order = await Purchase_order.findByPk(id);

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

		const savedOrder = await order.reload();
		return res.status(200).send(savedOrder);
	} catch (error) {
		return res.status(400).send(error.message);
	}
});

module.exports = router;
