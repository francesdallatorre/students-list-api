const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const studentsController = require('./controllers/students')
const APP = express()
const PORT = process.env.PORT || 3003;
const DBNAME = 'students';
const db = mongoose.connection;

// mongoose.connect(`mongodb://localhost:27017/${DBNAME}`, { useNewUrlParser: true });
//  mongoose.connection.once('open', () => {
//      console.log('connected to mongoose...');
//  });

const MONGODB_URI = process.env.MONGODB_URI || `mongodb://localhost:27017/${DBNAME}`

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

// mongoose.connection.once('open', () => {
//     console.log('connected to mongoose...');
// });

db.on('open', () => { });

const whitelist = ['http://localhost:3000', 'https://students-list-frontend.herokuapp.com']
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) >= -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}


APP.use(cors(corsOptions));

APP.use(express.json());

APP.use('/students', studentsController)


APP.listen(PORT, () => {
    console.log('Listening on port: ', PORT)
})