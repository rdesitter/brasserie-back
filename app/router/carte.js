const express = require("express");
const { carteController } = require("../controllers");
const { authenticateToken } = require("../utils/jwt");
const router = express.Router();

router.get("/cartes", authenticateToken, carteController.getCartes);
router.post("/cartes/add", authenticateToken, carteController.addCarte);

router.post("/cartes/:id/recipe/add", authenticateToken, carteController.addRecipe);

router.get("/category/:id", carteController.getRecipeByCategory);

router.get("/family/:id", carteController.getRecipeByFamily);

module.exports = router;