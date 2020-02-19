const express = require('express');
const mongoose = require('mongoose');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const bodyparser = require('body-parser');
const passport = require('passport');

const router = express();

//Body-Parser Middleware
router.use(bodyparser.urlencoded({extended: false}));
router.use(bodyparser.json());

//DB Config
const dbConnectionString = require('./config/keys').mongoURI;

//Connect to mongoDB
mongoose
    .connect(dbConnectionString)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

//Passport middleware
router.use(passport.initialize());
require('./config/passport')(passport); //execute the passport arrow function from passport.js


//First routes
router.get('/', (req, res) => res.send('Hello world'));

//Use Routes
router.use('/api/users', users);
router.use('/api/profile', profile);
router.use('/api/posts', posts);

const port = 5555;
router.listen(port, () => console.log(`Server running on port ${port}`));