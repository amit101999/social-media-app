const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");

// configuration for email
let transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "amitthakur10sep@gmail.com", // generated ethereal user
    pass: "vwkybrzlnwuupece", // generated ethereal password
  },
});

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
