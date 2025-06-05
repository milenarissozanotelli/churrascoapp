require('dotenv').config();

const StringCon = {
    connection: process.env.MONGODB_URI
}

module.exports = StringCon;