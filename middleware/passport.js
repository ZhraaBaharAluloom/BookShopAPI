const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt")

const { Signup } = require("../db/models");
const { use } = require("passport");
 

exports.LocalStrategy = new LocalStrategy(
    async (username, password, done) =>{
        try {
            const user = await Signup.findOne({where: {username: username}});
        
            const passwordMatched = user?  await bcrypt.compare(password, user.password) :  false;
            passwordMatched? done(null, user) : done(null,false);
        } catch (error) {
            done(error)
        }
    }
)