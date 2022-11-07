'use strict'

let express = require('express');
let PropertyController = require('../controllers/inmueble');

let router = express.Router();

var multipart = require("connect-multiparty");
var multipartMiddleware = multipart({uploadDir: "./uploads"});

router.get('/', PropertyController.getProperties);
router.get('/:id', PropertyController.getProperty);
router.post('/save-property', PropertyController.saveProperty);
router.post("/upload-image/:id", multipartMiddleware, PropertyController.uploadImage);
router.put('/property/:id', PropertyController.updateProperty);
router.delete('/property/:id', PropertyController.deleteProperty);

module.exports = router;