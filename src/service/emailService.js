import bcrypt from "bcrypt";
import db from "../models/models/index";
import nodemailer from "nodemailer";
require("dotenv").config();

const salt = bcrypt.genSaltSync(10);

const hashPassword = (userPassword) => {
  return bcrypt.hashSync(userPassword, salt);
};

const MAIL_HOST = "smtp.gmail.com";
const MAIL_POST = "587";
const MAIL_USERNAME = "vuvanhoangtb123@gmail.com";
const MAIL_PASSWORD = "pmxfzerncqbpvocy";
const MAIL_FROM_ADDRESS = "vuvanhoangtb123@gmail.com";

const sendEmail = async (email) => {
  try {
    const transport = nodemailer.createTransport({
      host: MAIL_HOST,
      port: MAIL_POST,
      secure: false,
      auth: {
        user: MAIL_USERNAME,
        pass: MAIL_PASSWORD,
      },
    });

    const options = {
      from: MAIL_FROM_ADDRESS,
      to: email,
      subject: "Reset Password",
      html: `
        <h2>Please click on given link to reset your password</h2>
        <a href="http://localhost:8000/reset-password/">Click me</a>
    `,
    };

    await transport.sendMail(options);

    return {
      EM: "Check your email.",
      EC: 0,
      DT: [],
    };
  } catch (error) {
    return {
      EM: "Something wrong in server",
      EC: -2,
      DT: [],
    };
  }
};

const sendResetPasswordMail = async (email) => {
  try {
    const transport = nodemailer.createTransport({
      host: MAIL_HOST,
      port: MAIL_POST,
      secure: false,
      auth: {
        user: MAIL_USERNAME,
        pass: MAIL_PASSWORD,
      },
    });

    const options = {
      from: MAIL_FROM_ADDRESS,
      to: email,
      subject: "For Reset Password",
      html: `
        <h2>Please click on given link to reset your password</h2>
        <a href='http://localhost:8000/api/v1/reset-password?email=${email}'>Reset Password</a>
    `,
    };
    await transport.sendMail(options);
  } catch (error) {}
};

const forgetPassword = async (email) => {
  try {
    let user = await db.User.findOne({
      where: { email: email },
    });

    if (user) {
      sendResetPasswordMail(user.email);
      return {
        EM: "Check your email reset password.",
        EC: 0,
        DT: [],
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "Something wrong in server",
      EC: -2,
      DT: [],
    };
  }
};

const resetPassword = async (email, password) => {
  try {
    const user = await db.User.findOne({ where: { email: email } });
    if (user) {
      const newPassword = hashPassword(password);
      await user.update({
        password: newPassword,
      });
      return {
        EM: "User password has been reset",
        EC: 0,
        DT: [],
      };
    }
  } catch (error) {
    return {
      EM: "Something wrong in server",
      EC: -2,
      DT: [],
    };
  }
};

module.exports = {
  sendEmail,
  forgetPassword,
  resetPassword,
};
