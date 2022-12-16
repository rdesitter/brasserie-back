const express = require("express");
const { carteController } = require("../controllers");
const router = express.Router();

router.get("/cartes", carteController.getCartes);

router.get("/category/:id", carteController.getRecipeByCategory);

router.get("/family/:id", carteController.getRecipeByFamily);

module.exports = router;