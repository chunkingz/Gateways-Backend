const express = require('express');
const router = express.Router();
const { Gateway } = require('../models/gateway');
const ObjectId = require('mongoose').Types.ObjectId;
const isValidIP = require('../helpers/is-valid-ip');
const { Peripheral } = require('../models/peripheral');

/**
 * GET all Gateway devices
 */
router.get('/', (req, res) => {
    Gateway.find((err, docs) => {
        if(!err) {
            res.status(200).send(docs);
        } else {
            console.log(`Error retrieving gateways: ${JSON.stringify(err, undefined, 2)}`);
            res.status(400).send(err);
        }
    })
});

/**
 * GET one Gateway device
 */
router.get('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).send(`No Gateway with the ID: ${req.params.id}`)
    }
    Gateway.findById(req.params.id, (err, docs) => {
        if(!err) {
            res.status(200).send(docs);
        } else {
            console.log(`Error retrieving gateway: ${JSON.stringify(err, undefined, 2)}`);
            res.status(400).send(err);
        }
    })
});

/**
 * POST (Save) a Gateway device
 */
router.post('/', (req, res) => {
    const { serialNumber, deviceName, ipv4, peripheralDevices } = req.body;

    // check to make sure the ip is valid and the peripherals are not more than 10
    if ( isValidIP(ipv4) && (peripheralDevices.length <= 10) ){
        
        const gateway = new Gateway({
            serialNumber,
            deviceName,
            ipv4,
            peripheralDevices
        });

        gateway.save((err, docs) => {
            if(!err) {
                res.status(200).send(docs)
            } else {
                console.log(`Error saving gateway: ${JSON.stringify(err, undefined, 2)}`);
                res.status(400).send(err);
            }
        });
    } else {
        res.status(400).send("Error: check the IP address to make sure it's valid and make sure the peripheral devices are not more than 10")
    }
});

/**
 * PUT (Update) a Gateway device
 */
router.put('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).send(`No Gateway with the ID: ${req.params.id}`)
    }

    const { serialNumber, deviceName, ipv4, peripheralDevices } = req.body;

    const gateway = {
        serialNumber,
        deviceName,
        ipv4,
        peripheralDevices
    };

    Gateway.findByIdAndUpdate(req.params.id, { $set: gateway }, { new: true }, (err, docs) => {
        if(!err) {
            res.status(200).send(docs);
        } else {
            console.log(`Error updating Gateway: ${JSON.stringify(err, undefined, 2)}`);
            res.status(400).send(err);
        }
    })
});

/**
 * DELETE a Gateway device
 */
router.delete('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).send(`No Gateway with the ID: ${req.params.id}`)
    }
    Gateway.findByIdAndDelete(req.params.id, (err, docs) => {
        if(!err) {
            res.status(200).send(docs);
        } else {
            console.log(`Error deleting Gateway: ${JSON.stringify(err, undefined, 2)}`);
            res.status(400).send(err);
        }
    })
})

/**
 * POST (Add) a Peripheral device
 */
 router.post('/:gatewayID/peripheralDevices/add/', (req, res) => {
    if(!ObjectId.isValid(req.params.gatewayID)){
        return res.status(400).send(`No Gateway with the ID: ${req.params.gatewayID}`)
    }

    // check: find the gateway to facilitate the next check
    Gateway.findById(req.params.gatewayID, (err, docs) => {
        if(!err) {
            let { UID, vendor, dateCreated, status } = req.body.peripheralDevices[0];
            dateCreated = new Date().toLocaleString()

            // check: make sure the peripherals are not more than 10
                        
            if ( docs.peripheralDevices.length < 10 ){
                const peripheral = new Peripheral({
                    UID,
                    vendor,
                    dateCreated,
                    status
                });

                Gateway.updateOne(
                    { _id: req.params.gatewayID },
                    { $push: 
                        {
                            peripheralDevices: {
                                $each: [{
                                    UID,
                                    vendor,
                                    dateCreated,
                                    status
                                }]
                            }
                        }
                    }, (err, docs) => {
                        if(!err) {
                            res.status(200).send(docs)
                        } else {
                            console.log(`Error saving peripheral: ${JSON.stringify(err, undefined, 2)}`);
                            res.status(400).send(err);
                        }
                });
            } else {
                res.status(400).send("Error: peripheral devices cannot be more than 10")
            }
        } else {
            console.log(`Error retrieving gateway: ${JSON.stringify(err, undefined, 2)}`);
            res.status(400).send(err);
        }
    })

});

/**
 * DELETE a Peripheral device
 */
router.delete('/:gatewayID/peripheralDevices/:peripheralID', (req, res) => {
    if(!ObjectId.isValid(req.params.gatewayID)){
        return res.status(400).send(`No Gateway with the ID: ${req.params.gatewayID}`)
    }

    Gateway.updateOne(
        { _id: req.params.gatewayID },
        { $pull: 
            {
                peripheralDevices: {
                    UID: req.params.peripheralID
                }
            }
    }, (err, docs) => {
        if(!err) {
            res.status(200).send(docs);
        } else {
            console.log(`Error deleting Peripheral device: ${JSON.stringify(err, undefined, 2)}`);
            res.status(400).send(err);
        }
    })
})

module.exports = router;
