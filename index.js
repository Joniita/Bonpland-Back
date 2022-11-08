'use strict'
require('dotenv').config();
let mongoose = require('mongoose');
let app = require('./app');
const PORT = process.env.PORT || 3500;
const connectionString = process.env.MONGO_DB_URI;


mongoose.Promise = global.Promise;
mongoose.connect(connectionString)
        .then(() => {
            console.log('Conexión a la base de datos establecida con éxito');

            // Crear servidor

            app.listen(PORT, () => {
                console.log('Servidor corriendo')
            })
        })
        .catch((err) => {
            console.log(err);
        })