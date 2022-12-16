const express = require("express");
const { roleController } = require("../controllers");
const router = express.Router();

router.get("/roles", roleController.getRoles);

module.exports = router;