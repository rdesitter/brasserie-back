const express = require("express");
const { mainController } = require("../controllers");
const router = express.Router();

router.get("/", mainController.getHome);
router.post("/contact", mainController.messageRecieved);

module.exports = router;
