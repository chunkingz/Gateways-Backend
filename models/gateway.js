const mongoose = require('mongoose');

const Gateway = mongoose.model('Gateway', {
    serialNumber: {type: String},
    deviceName: {type: String},
    ipv4: {type: String},
    peripheralDevices: {type: Array},
})

module.exports = { Gateway };
