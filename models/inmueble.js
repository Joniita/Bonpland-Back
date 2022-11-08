'use strcit'

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let PropertySchema = Schema({
    reference: Number,
    rooms: Number,
    area: Number,
    covered: Number,
    toilets: Number,
    price: Number,
    country: String,
    city: String,
    contractType: String,
    availability: String,
    image: String,
    prominent: String
    
})

module.exports = mongoose.model('Property', PropertySchema)


/*
reference
rooms
area (m2)
price
country
city
contractType
availability 
image
prominent

*/ 