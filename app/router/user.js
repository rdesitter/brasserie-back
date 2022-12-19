const express = require("express");
const { userController } = require("../controllers");
const router = express.Router();

router.get("/users", userController.getUsers);
router.get("/user/:id", userController.getUserById);
router.patch("/user/:id/edit", userController.updateUser);

router.post("/sendRegistrationMail", userController.sendMail);

router.post("/signup", userController.insertUser);
router.post("/saveUser", userController.saveUser);
router.post("/setPassword", userController.setPassword);

router.post("/login", userController.logUser);

module.exports = router;