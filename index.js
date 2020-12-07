const express = require('express');
const bodyParser = require('body-parser');

// Load environment variables
require('dotenv').config();

// CREATE APP
const app = express();

// MIDDLEWARE SETUP
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ROUTE SETUP
app.use('/routes/api/user', require('./routes/api/user'));
app.use('/routes/api/auth', require('./routes/api/auth'));

// PORT SETUP
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server Started')); 