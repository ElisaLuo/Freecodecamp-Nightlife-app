const yelp = require('yelp-fusion');
const express = require('express');
const app = express();
const token = "mIDOo4eFVacy6vFMkX9bvn8xfpWu7KW5B-JoREY_CVQN-xnk6LaD6MmRWp5BWWsYx0ME5cdUgd8qbYkkFb09k_zArvbxR1VqqYh37o1KeZMvyBV3aV5jG54WXdR0WXYx";
const client = yelp.client(token);
const home = require("./routes/home");
const mongoose = require("mongoose");
const passport = require('passport');
const session = require("express-session");
const auth = require("./routes/auth");
const bodyParser = require('body-parser');

process.env.NODE_ENV = 'production';

mongoose.connect('mongodb://elisal:Pdnlxx021@ds127963.mlab.com:27963/going-tonight');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
  console.log('Connection to the database successful');
});

app.use(express.static('public'));
app.use(session({
    secret: 'elktrjosd0983jlwsf08easd90',
    resave: true,
    saveUninitialized: true,
}));
app.use(bodyParser.urlencoded({ extended: true }));// for parsing application/x-www-form-urlencoded
app.use(passport.initialize());//Sets up for passport
app.use(passport.session());
app.use(express.static(__dirname + '/public'));
app.set('port', process.env.PORT || process.env.IP );
app.set('view engine', 'ejs');


//Sets up links for different sites
app.use("/", home);
app.use("/auth/github", auth);

//Starts port
var port = process.env.PORT || 3000;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});




