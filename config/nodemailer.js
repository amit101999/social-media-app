const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");
const env = require('./enviroment')

// configuration for email
let transporter = nodemailer.createTransport(env.smtp);

let renderTemplate = (data, relativePath) => {
  let mailHTML;
  ejs.renderFile(
    path.join(__dirname, "../views/mailer", relativePath),
    data,
    (err, template) => {
      if (err) {
        console.log("error in rendering email template :", err);
        return;
      }
      mailHTML = template;
    }
  );
  return mailHTML;
};

module.exports = {
  transporter: transporter,
  renderTemplate: renderTemplate,
};
