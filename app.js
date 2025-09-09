const express = require('express');
const cors = require('cors');
const routes = require('./router/routes');
const dotenv = require('dotenv');
const connectingDB = require('./Config/db');
const path = require('path')
dotenv.config()
const app = express()
connectingDB()
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// @ serve static 
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// routes 
app.use('/', routes)

module.exports = app;