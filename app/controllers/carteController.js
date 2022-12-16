const { Carte, Category, Family } = require('../models');

const carteController = {
    async getCartes(req, res) {
        try {
            const cartes = await Carte.findAll({
                include: [{
                    association: "recipes",
                    include: ["category"]
                }]
            });
            res.json(cartes)
        } catch (error) {
            console.log(error)
        }
    },

    async getRecipeByCategory(req, res) {
        try {
            const categoryId = req.params.id;
            const recipeList = await Category.findByPk(categoryId, {
                include: ["recipes"]
            });

            res.json(recipeList);
        } catch (error) {
            console.log(error)
        }
    },

    async getRecipeByFamily(req, res) {
        try {
            const familyId = req.params.id;
            const recipeList = await Family.findByPk(familyId, {
                include: [{
                    association: "categories",
                    include: ["recipes"]
                }]
            });

            res.json(recipeList);
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = carteController;
