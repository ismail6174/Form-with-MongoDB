import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 465,
  service: "gmail",
  secure: true, // true for 465, false for other ports
  auth: {
    user: "ismail.px6174@gmail.com",
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export const send_verification_email = async (email, otp_code) => {
  const info = await transporter.sendMail({
    from: "ismail.px6174@gmail.com Ismail Shah",
    to: email,
    subject: "OTP Verification Code",
    html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>OTP Verification Email</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
      }
      .email-container {
        max-width: 600px;
        margin: 20px auto;
        background-color: #ffffff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }
      .email-header {
        text-align: center;
        margin-bottom: 20px;
      }
      .email-header img {
        width: 100px;
        margin-bottom: 10px;
      }
      .email-body {
        font-size: 16px;
        line-height: 1.5;
        color: #333;
      }
      .otp {
        font-size: 24px;
        font-weight: bold;
        color: #4caf50;
        margin-top: 10px;
        text-align: center;
      }
      .cta-button {
        display: block;
        width: 100%;
        text-align: center;
        padding: 12px 0;
        background-color: #007bff;
        color: #ffffff;
        text-decoration: none;
        border-radius: 5px;
        margin-top: 20px;
        font-size: 16px;
      }
      .footer {
        text-align: center;
        font-size: 12px;
        color: #888;
        margin-top: 30px;
      }
      .footer a {
        color: #007bff;
        text-decoration: none;
      }
      @media (max-width: 600px) {
        .email-container {
          padding: 15px;
        }
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="email-header">
        
        <h1>OTP Verification</h1>
      </div>
      <div class="email-body">
        <p>Hello,</p>
        <p>
          You requested to verify your account. Please use the following
          One-Time Password (OTP) to complete your verification process:
        </p>
        <div class="otp">${otp_code}</div>
        <p>
          This OTP is valid for the next 10 minutes. Please do not share it with
          anyone.
        </p>
        <a href="#" class="cta-button">Verify Now</a>
      </div>
      <div class="footer">
        <p>If you did not request this, please ignore this email.</p>
        <p>&copy; 2025 Your Company | <a href="#">Privacy Policy</a></p>
      </div>
    </div>
  </body>
</html>
`, // HTML body
  });
};