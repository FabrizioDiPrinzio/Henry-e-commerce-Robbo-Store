const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const passport = require('passport');
const session = require('express-session')
const LocalStrategy = require('passport-local').Strategy;

const {User} = require('./db.js');

const server = express();

server.name = 'API';

server.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));
server.use(bodyParser.json({limit: '50mb'}));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
	res.header('Access-Control-Allow-Credentials', 'true');
	res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE'); //allows using all 4 request types
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

server.use(session({ secret: 'derpy', resave: false, saveUninitialized: true, }));


// ================= Express/Passport Setup ================= //
server.use(passport.initialize());
server.use(passport.session());

passport.use(new LocalStrategy(
	{
		usernameField: 'email',
        passwordField: 'password'
	},
	function(email, password, done) {
        User.findOne({where: { email: email }}).then(function(user) {
            if (!user || !user.correctPassword(password)) {
                return done(null, false, { message: 'Incorrect email or password.' });
            }

            done(null, user);
        })
        .catch(err => done(err))
    })
);

// ================= Passport Strategy Setup ================= //

passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	User.findByPk(id).then(function(user) {
        done(null, user);
    }).catch(function(err) {
        done(err, null);
    });
});



server.use('/', routes);

// Error catching endware.
server.use((err, req, res, next) => {
	// eslint-disable-line no-unused-vars
	const status = err.status || 500;
	const message = err.message || err;
	console.error(err);
	res.status(status).send(message);
});

module.exports = server;
