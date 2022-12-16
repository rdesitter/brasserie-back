const { User } = require('../models');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userController = {
    async getUsers(req, res) {
        try {
            const users = await User.findAll();
            res.json(users)
        } catch (error) {
            console.log(error)
        }
    },

    async insertUser(req, res) {
        try {
            const { name, email, password } = req.body;

            const hashedPassword = await bcrypt.hash(password, saltRounds);
            await User.create({
                name,
                email,
                password: hashedPassword,
            })
            
            res.send("Utilisateur ajouté");
        } catch (error) {
            console.log(error)
        }
    },

    async logUser(req, res) {
        try {
            const { email, password } = req.body;

            const currentUser = await User.findOne({ where: { email }, include: ['role']});
            console.log(currentUser);

            let validPassword;

            if (currentUser) {
                validPassword = await bcrypt.compare(password, currentUser.dataValues.password);
                
                if(!validPassword) {
                    res.status(401).json({ message : "Erreur d'utilisateur ou mot de passe"})
                }

                const user = {
                    email : currentUser.dataValues.email,
                    name: currentUser.dataValues.name,
                    role: currentUser.role.name,
                };

                res.json(user)
            }

            res.status(401).json({ message : "Erreur d'utilisateur ou mot de passe"});
            
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = userController;
