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

    async addCarte(req, res) {
        try {
            const { name } = req.body;
            await Carte.create({
                name
            });
    
            res.json({message: "La carte a bien été enregistrée."});
        } catch (error) {
            if(error.parent.constraint === 'carte_name_key') return res.status(404).json({message: "Ce nom de carte est déjà utilisé."})
            res.status(500).json({message: error.parent.detail})
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
