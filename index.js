const express = require('express');
const bodyParser = require('body-parser');

// CREATE APP
const app = express();

// MIDDLEWARE SETUP
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ROUTE SETUP
app.use('/routes/api/user', require('./routes/api/user'));

// PORT SETUP
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server Started')); 