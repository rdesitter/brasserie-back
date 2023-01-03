const { decode } = require('jsonwebtoken');
const { Carte, Category, Family, User } = require('../models');

const carteController = {
    async getCartes(req, res) {
        try {
            const cartes = await Carte.findAll({
                include: [{
                    association: "categories",
                    include: ["sections"]
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

            // get user id from token & find user
            const token = req.headers.authorization.split(' ')[1];
            const { email } = decode(token);
            const user = await User.findOne({where : {email}})
            
            await Carte.create({
                name,
                user_id: user.id
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
