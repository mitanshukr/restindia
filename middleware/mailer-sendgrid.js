const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const transport = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: process.env.SENDGRID_API_KEY
    }
}));

module.exports = transport;