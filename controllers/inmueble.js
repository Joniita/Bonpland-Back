'use strict'

const { param } = require('../app');
let Property = require('../models/inmueble')

let controller = {

    getProperties: function(req, res){
        Property.find({}).exec((err, properties) => {
            if(err) return res.status(500).send({ message: "Error al devolver los datos."});
            if(!properties) return res.status(404).send({ message: "No se encontraron datos."});
            return res.status(200).send({ properties });
        })
    },

    getProperty: function(req, res){
        let propertyId = (req.params.id);

        if(propertyId == null) return res.status(404).send({ message: "No existen los datos."});
        
        Property.findById(propertyId, (err, property) => {
            if(err) return res.status(500).send({ message: "Error al devolver los datos."});
            if(!property) return res.status(404).send({ message: "No se encontraron los datos."});
            return res.status(200).send({ property });
        })
    },

    saveProperty: function(req, res) {
        let property = new Property();

        let params = req.body;
        property.reference = params.reference;
        property.rooms = params.rooms;
        property.area = params.area;
        property.price = params.price;
        property.country = params.country;
        property.city = params.city;
        property.contractType = params.contractType;
        property.availability = params.availability;
        property.image = null;
        property.prominent = params.prominent;

        property.save((err, propertyStored) => {
            if(err) return res.status(500).send({ message: "Error al guardar los datos"});
            if (!propertyStored) return res.status(404).send({ message: "No se ha podido guardar"});
            return res.status(200).send({property: propertyStored});
        })


    }



};

module.exports = controller;