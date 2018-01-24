var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;

var User =  require('../models/user');
var config = require('./dbConfig');

module.exports = function (passport) {
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = config.secret;


    passport.use(new JwtStrategy(opts,(jwt_payload,done)=>{

        let val = jwt_payload.substring(7, jwt_payload.indexOf(','));
        User.getUserById(val, (err,user)=>{
            if(err)
                return done(null,user)
            if(user){
                return done(null,user)

            }else{
                return done(null,false);
            }
        })
    }))
}