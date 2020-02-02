const express = require('express');
const User = require('../../models/UserModel');
const router = express.Router();

//for token generation
const keys = require('../../config/keys');
const jwt = require('jsonwebtoken');

//React will convert the HTML into JSON(Key:Value)
router.get('/test', (req, res) => res.json({
    msg: 'users api works!'
}));

//Installed gravatar library & use it for avatar images
const gravatar = require('gravatar');

//Password Hashing using bcrypt library
const bcrypt = require('bcryptjs');

//RouteNo   1
// @route   POST api/users/register
// @desc    Register user
// @access  Public

router.post('/register', (req, res) => {
    User.findOne({email: req.body.email})
        .then(user =>{
            if (user) {
                return res.status(400).json({
                 email: 'Email already exists'   
                });
            } else {

                const avatar = gravatar.url(req.body.email, {
                    s: '200',   //Size of avatar
                    r: 'pg',    //rating is parental guidance
                    d: 'mm'     //default size type
                });

                const newUser = new User ({
                    name: req.body.name,
                    email: req.body.email,
                    avatar,  //if key & value name is same-deconstruction
                    password: req.body.password
                });

                bcrypt.genSalt(10, (err, salt) => {
                    if (err) throw err;
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;

                        newUser.save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                    });
                });
            }
        })
        .catch(err => console.log(err));
});

//RouteNo   2
// @route  POST api/users/login
// @desc    login user
// @access  Public
router.post('/login', (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    //Finfing user by email
    User.findOne({email})
        .then(user => {
            if(!user){
                return res.status(404).json({email: 'User not found'});
            }

        //Hash the password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        //create Payload
                        const Payload = {
                            id: user.id, name: user.id, avatar: user.avatar
                        };

                        //sign token
                        jwt.sign(
                            Payload, 
                            keys.secretOrKey, 
                            {expiresIn: 3600}, 
                            (err, token) => {

                                return res.json({
                                    token: 'Bearer ' + token
                                })
                            })

                    } else{
                        return res.status(400).json({password: 'Password Inccorrect!'});
                    }
                })
        })
        .catch(err => console.log('Error while User.findOne: ' + err));
});

module.exports = router;