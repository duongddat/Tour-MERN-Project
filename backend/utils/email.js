const nodemailer = require("nodemailer");

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name;
    this.url = url;
    this.from = `"Tour Email" <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === "production") {
      //Sendgird
      return nodemailer.createTransport({
        service: "gmail", //Recomention to use Sendgird
        auth: {
          user: process.env.EMAIL_FROM,
          pass: process.env.EMAIL_PASSWORD,
        },
      });
    }

    return nodemailer.createTransport({
      service: "gmail",
      secure: true,
      auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async send(subject) {
    //1. Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject: subject,
      html: `<b>${subject}</b>`,
    };

    //2. Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    const html = ``;

    await this.send("Welcome to Web Tour!");
  }

  async sendPasswordReset() {
    await this.send("Your password reset token (valid for only 10 minutes)");
  }
};
