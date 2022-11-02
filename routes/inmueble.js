'use strict'

let express = require('express');
let PropertyController = require('../controllers/inmueble');

let router = express.Router();

router.get('/', PropertyController.getProperties);
router.get('/:id', PropertyController.getProperty);
router.post('/save-property', PropertyController.saveProperty);

module.exports = router;