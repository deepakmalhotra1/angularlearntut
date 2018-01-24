var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;

var User =  require('../models/user');
var config = require('../config/dbConfig');

module.exports = function (passport) {
    let opts = {};
    opts.jwtFromHeader = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = config.secret;

    passport.use(new JwtStrategy(opts,(jwt_payload,done)=>{
        User.getUserById(jwt_payload.id, (err,user)=>{
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