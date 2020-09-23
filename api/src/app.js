require('dotenv').config(); //Es la forma de requerir el archivo .env//
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const passport = require('passport');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
// ============= Fin de imports ==============

const {User} = require('./db.js');
const {
	passportSecret,
	googleClientID,
	googleClientSecret,
	githubClientID,
	githubClientSecret
} = process.env;

const server = express();

server.name = 'API';

server.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));
server.use(bodyParser.json({limit: '50mb'}));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', 'https://accounts.google.com/');
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
	res.header('Access-Control-Allow-Credentials', 'true');
	res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH'); //allows using all 4 request types
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

// ================= Express/Passport Setup ================= //

passport.use(
	new LocalStrategy(
		{
			usernameField: 'email',
			passwordField: 'password'
		},
		(email, password, done) => {
			User.findOne({where: {email: email}})
				.then(user => {
					if (!user || !user.correctPassword(password)) {
						return done(null, false, {message: 'Incorrect email or password.'}); // On error
					}

					// On success
					return done(null, user);
				})
				.catch(err => done(err));
		}
	)
);

passport.use(
	new GoogleStrategy(
		{
			clientID: googleClientID,
			clientSecret: googleClientSecret,
			callbackURL: '/auth/google/redirect'
		},
		async (accessToken, refreshToken, profile, done) => {
			try {
				const [user, created] = await User.findOrCreate({
					where: {googleId: profile.id},
					defaults: {name: profile.displayName, email: profile.emails[0].value}
				});
				// On error
				if (!user) return done(null, false, {message: 'No pudimos loguearte con esa cuenta'});

				// On success
				return done(null, user);
			} catch (error) {
				done(error);
			}
		}
	)
);

passport.use(
	new GitHubStrategy(
		{
			clientID: githubClientID,
			clientSecret: githubClientSecret,
			callbackURL: '/auth/github/redirect'
		},
		async (accessToken, refreshToken, profile, done) => {
			console.log(profile);
			try {
				const [user, created] = await User.findOrCreate({
					where: {githubId: profile.id},
					defaults: {
						name: profile.displayName,
						email: profile.emails ? profile.emails[0].value : null
					}
				});

				// On error
				if (!user) return done(null, false, {message: 'No pudimos loguearte con esa cuenta'});

				// On success
				return done(null, user);
			} catch (error) {
				done(error);
			}
		}
	)
);

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(function(id, done) {
	User.findByPk(id).then(user => done(null, user)).catch(err => done(err, null));
});

// ================= Sessions ============================== //

server.use(session({secret: passportSecret, resave: false, saveUninitialized: true}));

server.use(passport.initialize());
server.use(passport.session());

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
