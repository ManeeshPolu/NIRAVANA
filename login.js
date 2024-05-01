// reference: https://www.passportjs.org/concepts/authentication/middleware/

const express = require("express");
const passport = require("passport");
const router = express.Router();

router.post(
  "/login",
  alreadyLoggedIn,
  passport.authenticate("local", {
    successRedirect: "/",
    failureFlash: true,
  })
);

function alreadyLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    console.log("already logged in");
    res.redirect("/");
    return;
  }
  next();
}

router.get("/login", alreadyLoggedIn, (req, res) => {
  res.render("./pages/login");
});

module.exports = router;
