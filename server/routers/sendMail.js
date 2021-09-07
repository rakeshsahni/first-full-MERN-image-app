const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground'
const Oauth2Client = new OAuth2(
  process.env.CLIENT_ID_MAIL,
  process.env.CLIENT_SECRET_MAIL,
  process.env.REDIRECT_URI_MAIL,
  OAUTH_PLAYGROUND,
);

const sendMailFun = async (to, url, txt) => {
  Oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN_MAIL,
  });
  try {
      
    const accessToken = await Oauth2Client.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.SENDER_EMAIL,
        clientId: process.env.CLIENT_ID_MAIL,
        clientSecret: process.env.CLIENT_SECRET_MAIL,
        refreshToken: process.env.REFRESH_TOKEN_MAIL,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: to,
      subject: "Confirm your account",
      text: "Hello mail option TEXT",
      html: `
        <div>
          <p>You are almost done to verify Gmail</p>
          <p>Just click below link to verify you gamil</p>
          <a href=${url}>${txt}</a>
          <p>if button does not work then click below link</p>
          <div>${url}</div>
        </div>
      `,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) return err;
      else return info;
    });
  } catch (error) {
    console.error(error);
    return error;
  }
};

module.exports = sendMailFun;
