const express = require("express");
const { userController } = require("../controllers");
const router = express.Router();

router.get("/users", userController.getUsers);

router.post("/signup", userController.insertUser);

router.get("/login", userController.logUser);

module.exports = router;