const { User } = require("../db/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRATION_MS } = require("../config/keys");



exports.signup = async (req, res, next) => {
    const saltRounds = 10;

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    console.log("exports.signup -> hashedPassword", hashedPassword)
    req.body.password= hashedPassword;
   const newUser = await User.create(req.body);
    // res.status(201).json({ message: "User created successfully" });
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

exports.signin = async (req,res,next) => {
  console.log("exports.signin -> req", req)
  try {
    const {user} = req;
    const payload = {
      id : user.id,
      username:user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      expires: Date.now() + parseInt(JWT_EXPIRATION_MS), // the token will expire 15 minutes from when it's generated

    }
    const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
    res.json({ token });

    
  } catch (error) {
    next(error)
  }
}