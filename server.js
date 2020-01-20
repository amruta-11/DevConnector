const express = require('express');
const mongoose = require('mongoose');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const router = express();

//DB Config
const db = require('./config/keys').mongoURI;

//Connect to mongoDB
mongoose
    .connect(db)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

//First routes
router.get('/', (req, res) => res.send('Hello world'));

//Use Routes
router.use('/api/users', users);
router.use('/api/profile', profile);
router.use('/api/posts', posts);

const port = 5555;
router.listen(port, () => console.log(`Server running on port ${port}`));