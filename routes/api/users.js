const express = require('express');
const UserCollection = require('../../models/UserModel');
const router = express.Router();

//React will convert the HTML into JSON(Key:Value)
router.get('/test', (req, res) => res.json({
    msg: 'users api works!'
}));

// @route   POST api/users/register
// @desc    Register user
// @access  Public

router.post('/register', (req, res) => {
    UserCollection.findOne({email: req.body.email})
        .then(user =>{
            if (user) {
                return res.status(400).json({
                 email: 'Email already exists'   
                });
            } else {
                const newUser = new UserCollection ({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                });

                newUser.save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err));

            }
        })
        .catch(err => console.log(err));
});
module.exports = router;