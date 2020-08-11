const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt")

const { User } = require("../db/models");
 

exports.LocalStrategy = new LocalStrategy(
    async (username, password, done) =>{
        try {
            const user = await User.findOne({where: {username: username}});
        
            const passwordMatched = user?  await bcrypt.compare(password, user.password) :  false;
          return  passwordMatched? done(null, user) : done(null,false);
        } catch (error) {
            done(error)
        }
    }
)