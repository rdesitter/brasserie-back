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
    }
}

module.exports = mainController;
