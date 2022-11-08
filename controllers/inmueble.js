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
        property.covered = params.covered;
        property.toilets = params.toilets;
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


    },

    uploadImage: function(req, res){
        let propertyId = req.params.id;
        let fileName = "Imagen no subida.";

        if(req.files){
            let filePath = req.files.image.path;
            let fileSplit = filePath.split("\\");
            let fileName = fileSplit[1];
            let extSplit = fileName.split(".");
            let fileExt = extSplit.at(-1);

            if(fileExt == "png" || fileExt == "jpg" || fileExt == "jpeg" || fileExt == "gif"){
                Property.findByIdAndUpdate(propertyId, {image: fileName}, {new: true}, (err, propertyUpdate) =>{
                    if(err) return res.status(500).send({ message: "Error al subir archivo." });
                    if(!propertyUpdate) return res.status(404).send({ message: "No se encontró archivo para subir." });
    
                    return res.status(200).send({ property: propertyUpdate });
                });
            }else{
                fs.unlink(filePath, (err) =>{
                    return res.status(200).send({ message: "La extención del archivo no es válida" });
                });
            };
            
        }else{
            return res.status(200).send({ message: fileName });
        };
    },

    updateProperty: function(req, res) {
        let propertyId = req.params.id;
        let update = req.body;

        Property.findByIdAndUpdate(propertyId, update, {new:true}, (err, propertyUpdated) => {
            if(err) return res.status(500).send({ message: "Error al actualizar."});
            if(!propertyUpdated) return res.status(404).send({ message: "No existe la propiedad para actualizar"});
            return res.status(200).send({ propertyUpdated })
        })
    },

    deleteProperty: function(req, res) {
        let propertyId = req.params.id;

        Property.findByIdAndRemove(propertyId, (err, propertyDeleted) => {
            if(err) return res.status(500).send({ message: "No se ha podido eliminar la propiedad."});
            if(!propertyDeleted) return res.status(404).send({ message: "No existe la propiedad a eliminar."});
            return res.status(200).send({ property: propertyDeleted });
        })
    }

};

module.exports = controller;