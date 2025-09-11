const express = require('express');
const cors = require('cors');
const routes = require('./router/routes');
const dotenv = require('dotenv');
const connectingDB = require('./Config/db');
const path = require('path')
dotenv.config()
const app = express()
connectingDB()


// CORS middleware
app.use(cors({
    origin: 'http://localhost:5173', // frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

// // OPTIONS requests auto handle
// app.options('*', cors());
// app.use(cors());



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// @ serve static 
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// routes 
app.use('/', routes)

module.exports = app;