const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.APP_PASSWORD,
    }
});

const registrationMail = (email, token) => {
    return {
        from: "brasseriedutheatre34000@gmail.com",
        to: email,
        subject: "Votre compte Brasserie du Théâtre",
        html: `<p>Bonjour,</p>
        <p>Un compte sur brasseriedutheatre.fr a été créé pour cette adresse email.</p>
        <p>Pour créer votre mot de passe rendez-vous sur le lien : 
        <a href='${process.env.FRONT_URL}/register?token=${token}'>Création de mot de passe</a></p>
        <br /><br />
        <p>Si ce lien ne fonctionne pas vous pouvez coller cette adresse dans votre navigateur : <br />
        ${process.env.URL}/register?token=${token}</p>`,
    }
};

module.exports = { registrationMail, transporter };
