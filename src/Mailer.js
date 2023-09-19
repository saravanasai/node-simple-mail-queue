var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "95b58f96bdd575",
        pass: "b4674bfdaaec6d"
    }
});

module.exports =  transporter