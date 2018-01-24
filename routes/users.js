var express = require('express');
var router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const config = require('../config/dbConfig')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a home');
});

router.post('/register', function(req, res, next) {
    console.log('getting values ',req.body)
    let newUser = new User({
        name:req.body.name,
        email:req.body.email,
        username:req.body.username,
        password:req.body.password
    });

    User.addUser(newUser,(err,user)=>{
        if(err) {
            console.log('error is ',err)
            res.json({success: false, msg: 'failed'})
        }else{
            res.json({success: true, msg: 'user registered'})

        }
    })
});

router.post('/authenticate', function(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;

    console.log('user name ',username, 'pass ',password)

    User.getUserByUsername(username,(err,user)=>{
        if(err)
            throw err;
        if(!user){
            return res.json({success: false,msg:'user not found'})
        }
        console.log('getting value yeah ',user, 'secret ',config.secret);

        User.comparePassword(password,user.password,(err,isMatch)=>{
        console.log('checking the password ',isMatch, 'ty pe ',typeof isMatch, 'err ',err);
            if(err)
                throw err;
            if(isMatch){
                console.log('i am in match')
                const token = jwt.sign({exp:604800,data:user.toString()},config.secret);
                console.log('im in match');
                res.json({
                    success:true,
                    token: 'JWT '+token,
                    user: {
                        id: user._id,
                        name:user.name,
                        username:user.username,
                        email:user.email
                    }
                })
            }else{
                console.log('im in match else')

                return res.json({success: false,msg:'wrong password'})
            }
        })
    })
});

router.get('/profile', function(req, res, next) {
    res.send('respond with a profile');
});


module.exports = router;
