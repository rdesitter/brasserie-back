const { User } = require('../models');
const bcrypt = require('bcrypt');
const { generateAccessToken, generateRefreshToken } = require('../utils/jwt');
const { transporter, registrationMail } = require('../utils/nodemail');
const saltRounds = 10;

const userController = {
    async getUsers(req, res) {
        try {
            const users = await User.findAll({ 
                attributes: { exclude: ['password'] },
            });
            res.json(users)
        } catch (error) {
            console.log(error)
        }
    },

    async getUserById(req, res) {
        try {
            const { id } = req.params;
            const currentUser = await User.findByPk(id);
            console.log(currentUser);
            const user = {
                id: currentUser.dataValues.id,
                email: currentUser.dataValues.email,
                name: currentUser.dataValues.name,
                admin: currentUser.dataValues.admin,
                active: currentUser.dataValues.active,
            }
            if (currentUser) {
                return res.json(user);
            }
            res.status(404).json({ message: "Cet utilisateur n'existe pas" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Erreur serveur" });
        }
    },

    async updateUser(req, res) {
        try {
            const { name, email, admin } = req.body;
            const { id } = req.params;
            const user = await User.findByPk(id);
            user.name = name;
            user.email = email;
            user.admin = admin;
            await user.save();
            res.json({message: "Modification enregistrée."})
        } catch (error) {
            res.status(500).json({message: 'Erreur serveur. Merci de reessayer plus tard.'})
        }
    },

    async saveUser(req, res) {
        try {
            const { name, email, admin } = req.body;
            await User.create({
                name,
                email,
                admin
            });
    
            res.json({message: "L'utilisateur a bien été enregistré."});
        } catch (error) {
            if(error.parent.constraint === 'user_email_key') return res.status(404).json({message: "Cet email est déjà utilisé."})
            res.status(500).json({message: error.parent.detail})
        }
    },

    async logUser(req, res) {
        try {
            const { email, password } = req.body;

            const currentUser = await User.findOne({ where: { email }});

            let validPassword;

            console.log(currentUser);

            if (currentUser) {
                validPassword = await bcrypt.compare(password, currentUser.dataValues.password);
                
                if(!validPassword)  return res.status(401).json({ message : "Erreur d'utilisateur ou mot de passe"})

                const user = {
                    email : currentUser.dataValues.email,
                    name: currentUser.dataValues.name,
                    admin: currentUser.dataValues.admin,
                };

                const accessToken = generateAccessToken(user);
                const refreshToken = generateRefreshToken(user);

                return res.json({ user, accessToken, refreshToken });
            }

            res.status(401).json({ message : "Erreur d'utilisateur ou mot de passe"});
            
        } catch (error) {
            console.log(error);
            res.status(500).json({ message : "Erreur serveur"});
        }
    },

    async sendMail(req, res) {
        const { name, email, role } = req.body;

        try {
            // Check if user exist
            const currentUser = await User.findOne({ where: {email}});
            // Then send email with instructions
            if(currentUser) {
                const accessToken = generateAccessToken({name, email, role});
                transporter.sendMail(registrationMail(email, accessToken),
                    (error) => {
                      if (error) {
                        console.log(error);
                        res.status(500).json({
                          message:
                            "Désolé le service est inactif pour le moment. Merci de ressayer dans quelques minutes.",
                        });
                      } else {
                        res.json({
                          message:
                            "Un email contenant les instructions pour définir un mot de passe a été envoyé au nouvel utilisateur.",
                        });
                      }
                    }
                );
            } else {
                res.json({ message: "Cet utilisateur n'existe pas." });
            }
        } catch (error) {
            res.status(500).json({ message: "Erreur serveur" });
        }
    },
    async setPassword(req, res) {
        try {
            const { email, password } = req.body;
    
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            
            const user = await User.findOne({where: {email}});
            user.password = hashedPassword;
            user.active = true;
            await user.save();
    
            res.json({message: "Votre mot de passe a bien été enregistré."})
        } catch (error) {
            res.status(500).json({message: 'Erreur serveur. Merci de reessayer plus tard.'})
        }
    }
}

module.exports = userController;
