const express = require('express');
const mainRouter = require("./main");
const userRouter = require("./user");
const roleRouter = require("./role");
const carteRouter = require("./carte");

const router = express.Router();

router.use(mainRouter, userRouter, roleRouter, carteRouter);

module.exports = router;