const eventEmitter = require('./eventEmitter');
const nodemailer = require("nodemailer");

module.exports = () => {
    eventEmitter.on('send_email', async (emailData) => {

        let transporter = nodemailer.createTransport({
            host: 'smtp.office365.com',
            port: 587,
            auth: {
                user: "emin_uzgur@hotmail.com", // generated ethereal user
                pass: "EminUzgur95", // generated ethereal password
            },
        });
        let info = await transporter.sendMail({
            from: '"Fred Foo 👻" ',
            ...emailData
        });



    });
}