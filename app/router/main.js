const express = require("express");
const { mainController } = require("../controllers");
const { authenticateToken } = require("../utils/jwt");
const router = express.Router();

router.get("/", mainController.getHome);
router.post("/contact", mainController.messageRecieved);
router.post("/refreshToken", mainController.refreshToken);

// test authentification
router.get('/me', authenticateToken, (req, res) => {
  res.send(req.user);
});

module.exports = router;
