//require dependencies


const express = require('express');
const path =require("path");



//create express app PORT variables
const app = express();
const PORT = process.env.PORT || 3001;

//set up express to handle data parsing

app.use(express.urlencoded({ extended: true}));

app.use(express.json());
app.use(express.static(path.join(__dirname + '/app/public')));

// inlcude html-routes.js and api-routes.js in server

require("./app/routing/api-routes.js")(app);
require("./app/routing/html-routes.js")(app);


app.listen(PORT, function(){
    console.log( "Listening on PORT:" + PORT);
});

