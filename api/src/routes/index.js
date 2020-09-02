const express = require('express');
// import all routers;
const productRouter = require('./product.js');

const app = express();

// load each router on a route
// i.e: router.use('/auth', authRouter);
// app.use('/auth', authRouter);
app.use('/products', productRouter);

app.get('/', (req, res) => {
	res.send('Hola');
});

module.exports = app;
