'use strict'

let express = require('express');
let bodyParser = require('body-parser');

let app = express();

//Archivos de rutas

let property_routes = require('./routes/inmueble');

//middlewares

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//CORS


//Rutas

app.use('/api', property_routes);



module.exports = app;