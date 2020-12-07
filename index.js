const express = require('express');

// CREATE APP
const app = express();

// MIDDLEWARE SETUP
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ROUTE SETUP
app.use('/routes/api/user', require('./routes/api/user'));

// PORT SETUP
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server Started')); 