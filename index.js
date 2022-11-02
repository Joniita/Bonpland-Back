'use strict'

let mongoose = require('mongoose');
let app = require('./app');
let port = 3500;


mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://jonadev:987654321@clusterbonpland.xtzbl31.mongodb.net/bonplandDB?retryWrites=true&w=majority')
        .then(() => {
            console.log('Conexión a la base de datos establecida con éxito');

            // Crear servidor

            app.listen(port, () => {
                console.log('Servidor corriendo')
            })
        })
        .catch((err) => {
            console.log(err);
        })