const express = require('express');
const User = require('../../models/User');
const router = express.Router();

//passport for verifying the token
const passport= require('passport');


//for token generation
const keys = require('../../config/keys');
const jwt = require('jsonwebtoken');

//Install gravatar library & use it for avatar images
const gravatar = require('gravatar');

//Password Hashing using bcrypt library
const bcrypt = require('bcryptjs');

// Load input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

//RouteNo   1
// @route   POST api/users/register
// @desc    Register user
// @access  Public

router.post('/register', (req, res) => {
const {errors, isValid} = validateRegisterInput(req.body);

//Check Validation
if (!isValid){
    return res.status(400).json(errors);
}
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

                        newUser
                        .save()
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
// @desc    login user / Returning JWT token
// @access  Public
router.post('/login', (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    const { errors, isValid } = validateLoginInput(req.body);   
    if (!isValid) {
      return res.status(400).json(errors);

    //Finding user by email
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
                            id: user.id, name: user.name, avatar: user.avatar
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
}
}
);

//RouteNo   3
// @route  GET api/users/current
// @desc    return current user
// @access  Private

router.get('/current',
passport.authenticate('jwt', {session : false}),
(req, res) => {
  res.json({msg: 'Success!'})  
});

module.exports = router;