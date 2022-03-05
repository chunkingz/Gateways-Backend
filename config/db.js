require('dotenv').config();

module.exports = {
    // database: 'mongodb://localhost:27017/gateways',
    database: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@gateways.xbybn.mongodb.net/gateways?retryWrites=true&w=majority`,
}
