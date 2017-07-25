const yelp = require('yelp-fusion');
const express = require('express');
const app = express();
const token = "mIDOo4eFVacy6vFMkX9bvn8xfpWu7KW5B-JoREY_CVQN-xnk6LaD6MmRWp5BWWsYx0ME5cdUgd8qbYkkFb09k_zArvbxR1VqqYh37o1KeZMvyBV3aV5jG54WXdR0WXYx";
const client = yelp.client(token);
const home = require("./routes/home")

app.use(express.static(__dirname + '/public'));
app.set('port', process.env.PORT || process.env.IP );
app.set('view engine', 'ejs');


//Sets up links for different sites
app.use("/", home);


//Starts port
var port = process.env.PORT || 3000;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});


