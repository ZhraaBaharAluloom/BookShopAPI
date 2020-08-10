const { Signup } = require("../db/models");
const bcrypt = require("bcrypt");


exports.signup = async (req, res, next) => {
    const saltRounds = 10;

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    console.log("exports.signup -> hashedPassword", hashedPassword)
    req.body.password= hashedPassword;
    await Signup.create(req.body);
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};

exports.signin = async (req,res,next) => {
  console.log("exports.signin -> req", req)
  try {
    
  } catch (error) {
    next(error)
  }
}