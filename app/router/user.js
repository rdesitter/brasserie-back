const express = require("express");
const { userController } = require("../controllers");
const { authenticateToken, authorizeAdmin } = require("../utils/jwt");
const router = express.Router();

router.get("/users", authenticateToken, userController.getUsers);
router.get("/user/:id", authenticateToken, userController.getUserById);
router.patch("/user/:id/edit", authenticateToken, userController.updateUser);

router.post("/sendRegistrationMail", userController.sendMail);

router.post("/saveUser", authenticateToken, authorizeAdmin, userController.saveUser);
router.post("/setPassword", userController.setPassword);

router.post("/login", userController.logUser);

module.exports = router;