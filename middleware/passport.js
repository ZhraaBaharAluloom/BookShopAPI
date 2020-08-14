const { JWT_SECRET } = require("../config/keys");

// Strategies
const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;

// bcrypt
const bcrypt = require("bcrypt");

// User model
const { User } = require("../db/models");

exports.LocalStrategy = new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({ where: { username: username } });

    const passwordMatched = user
      ? await bcrypt.compare(password, user.password)
      : false;
    return passwordMatched ? done(null, user) : done(null, false);
  } catch (error) {
    done(error);
  }
});

exports.jwtStrategy = new JWTStrategy(
  {
    jwtFromRequest: fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
  },
  async (jwtPayload, done) => {
    if (Date.now() > jwtPayload.exp) {
      return done(null, false);
    } else {
      const user = await User.findByPk(jwtPayload.id);
      return done(null, user);
    }
  }
);
