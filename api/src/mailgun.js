require('dotenv').config(); //Es la forma de requerir el archivo .env//

const {mailgunApiKey, mailgunDomain} = process.env;

var mailgun = require('mailgun-js')({apiKey: mailgunApiKey, domain: mailgunDomain});

const data = {
	from: 'RobboStore <sanchezlismairy@gmail.com>',
	to: 'sanchezlismairy@gmail.com',
	subject: ' Hola mundo',
	text: '¡Probando algo de genialidad Mailgun!',
	html:
		'<div style="width: 500px; height: 400px: background: #ebebeb; color: red"> <p><b> Esto es un mensaje de prueba</p></div>'
};

mailgun.messages().send(data, function(error, body) {
	if (error) {
		console.log(error);
	}
	console.log(body);
});
