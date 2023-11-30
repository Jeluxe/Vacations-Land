const express = require('express');
const app = express();
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {
    localStrategyHandler,
    serializeUser,
    deserializeUser,
    isValid
} = require('./passport');
const { PORT, dbConfig, cookieConfig, sessionHash } = require('./config');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mysql = require('mysql2/promise');
const loginController = require('./controllers/login-controller');
const vacationController = require('./controllers/vacation-controller');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({
    secret: sessionHash,
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(dbConfig),
    cookie: cookieConfig
}));

passport.use('local', new LocalStrategy(localStrategyHandler));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);
app.use(passport.initialize());
app.use(passport.session());

const { port, ...config } = dbConfig;
mysql.createConnection({
    ...config
}).then(connection => {
    global.mysqlConnection = connection;
    app.listen(PORT, () => {
        console.log(`app is on port: ${PORT}`);
    });
});

app.use('/', loginController);
app.use('*', isValid);
app.use('/', vacationController); //controllers

process.on('uncaughtException', (err, origin) => {
    console.error(err);
});