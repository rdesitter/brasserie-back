const express = require('express');
const mainRouter = require("./main");
const userRouter = require("./user");
const carteRouter = require("./carte");

const router = express.Router();

router.use(mainRouter, userRouter, carteRouter);

module.exports = router;