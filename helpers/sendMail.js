const nodeMailer = require('nodemailer');

function sendMail(to, subject, text) {
    const transporter = nodeMailer.createTransport({
        // TODO: change this part so it would work with any email host
        service: 'Naver',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const message = {
        from: process.env.EMAIL_FROM,
        to: to,
        subject: subject,
        text: text
    };

    transporter.sendMail(message, (error, info) => {
        if (error) {
            throw error;
        }
        console.log(info);
    });
}

module.exports = sendMail;