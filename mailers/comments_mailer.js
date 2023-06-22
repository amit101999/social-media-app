const nodemailer = require("../config/nodemailer");

exports.newComment = async (comment) => {
  let HTMLString = nodemailer.renderTemplate(
    { comment: comment },
    "/comments/new_comment.ejs"
  );
  await nodemailer.transporter.sendMail(
    {
      from: "amitthakur10sep@gmail.com", // sender address
      to: comment.user.email, // list of receivers
      subject: "you have a new comment", // Subject line
      text: "Hello world?", // plain text body
      html: HTMLString, // html body
    },
    (err, info) => {
      if (err) {
        console.log("error in sending mail : ", err);
        return;
      }
      console.log("mail send : ", info);
      return;
    }
  );
};
