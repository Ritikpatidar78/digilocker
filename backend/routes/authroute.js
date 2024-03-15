const express = require("express");
const { registerauth, loginauth } = require("../controllers/authcontroller");
const router  = express.Router();

router.post("/register",registerauth)
router.post("/login",loginauth)

module.exports = router