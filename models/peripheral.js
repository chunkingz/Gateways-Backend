const mongoose = require('mongoose');

const Peripheral = mongoose.model('Peripheral', {
    UID: {type: String},
    vendor: {type: String},
    dateCreated: {type: Date},
    status: {type: String},
})

module.exports = { Peripheral };
