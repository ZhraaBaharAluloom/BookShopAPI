const express = require("express");
const router = express.Router();
const { signup, signin } = require("../controllers/usersController");
const passport = require("passport");


//Sign up
router.post("/signup", signup);

//Sign in
router.post("/signin",passport.authenticate("local", {session: false}), signin);


module.exports = router;
