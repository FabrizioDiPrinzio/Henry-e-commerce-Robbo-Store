var  apiKey  = '1f329c28bd5d533b74a297f71b1d5ee0-cb3791c4-3c5c3c83'; 
var  domain  = 'sandbox0c3cd1b64bf049a0b1fc4ecac8fc8aae.mailgun.org'; 
var mailgun = require ('mailgun-js') ({apiKey : apiKey , domain : domain}); 

const  data  = {
    from : 'RobboStore <sanchezlismairy@gmail.com>', 
    to : 'sanchezlismairy@gmail.com', 
    subject : ' Hola mundo', 
    text :'¡Probando algo de genialidad Mailgun! ' 
};

mailgun.messages().send( data, function (error , body){    
    if (error){
        console.log(error);
    }
    console.log(body);
}) ;



