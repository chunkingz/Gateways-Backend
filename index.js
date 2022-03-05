const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/db');
const gatewayController = require('./controllers/gatewayController');
// const { v4 } = require('uuid');
require('dotenv').config();

mongoose.connect(config.database);
// mongoose.connection.on('connected', () => console.log(`Connected to db: ${config.database}`));
mongoose.connection.on('connected', () => console.log(`Connected to the db`));
mongoose.connection.on('error', (err) => console.log(`An error occurred: ${err}`));

const app = express();
const PORT = process.env.PORT;
// const uuid = v4;
// console.log(uuid());

app.use(express.json());

app.use(cors());

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => res.status(200).send('Welcome to Musala Soft Gateway API service...'));

app.use('/gateways', gatewayController)

app.listen(PORT, () => console.log(`Musala Soft Gateway API Service running on port ${PORT}`));
