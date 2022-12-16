const jwt = require("jsonwebtoken");
const { generateAccessToken } = require("../utils/jwt");

const mainController = {
    getHome(req, res) {
        res.send("Hello world")
    },
    messageRecieved(req, res) {
        try {
            //TODO ajout nodemailer
            const { email, name, message } = req.body;
            console.log(email, name, message );
            res.json({ message: 'Votre message a bien été envoyé.'})
        } catch (error) {
            res.json({ message: error.message})
        }
    },
    refreshToken(req, res) {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) return res.status(401).send({message: 'Accès non autorisé'})

        jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) {
              return res.sendStatus(401)
            }
        
            // TODO: Check en base que l'user est toujours existant/autorisé à utiliser la plateforme
            delete user.iat;
            delete user.exp;
            const refreshedToken = generateAccessToken(user);
            res.send({
                accessToken: refreshedToken,
            });
        });
    }
}

module.exports = mainController;
