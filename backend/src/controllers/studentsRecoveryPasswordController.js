import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { config } from "../../config.js";
import studentModel from "../models/students.js";
import HTMLRecoveryEmail from "../utils/sendMailRecovery.js";

const recoveryPasswordController = {};

recoveryPasswordController.requestCode = async (req, res) => {
  try {
    const { email } = req.body;
    const userFound = await studentModel.findOne({ email });

    if (!userFound) {
      return res.status(404).json({ message: "User not found" });
    }
    const randomCode = crypto.randomBytes(3).toString("hex");

    const token = jsonwebtoken.sign(
      { email, randomCode, userType: "student", verified: false },
      config.JWT.secret,
      { expiresIn: "15m" },
    );
    res.cookie("recoveryCookie", token, { maxAge: 15 * 60 * 1000 });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.email.user_email,
        pass: config.email.password_email,
      },
    });

    const mailOptions = {
      from: config.email.user_email,
      to: email,
      subject: "Recuperación de contraseña",
      body: "El código vence en 15 minutos",
      html: HTMLRecoveryEmail(randomCode),
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("error" + error);
        return res.status(500).json({ message: "Error sending mail" });
      }
      return res.status(200).json({ message: "Email sent" });
    });
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

recoveryPasswordController.verifyCode = async (req, res) => {
  try {
    const { code } = req.body;

    const token = req.cookies.recoveryCookie;

    const decoded = jsonwebtoken.verify(token, config.JWT.secret);

    const { email } = decoded;

    if (code !== decoded.randomCode) {
      return res.status(400).json({ message: "Invalid code" });
    }

    const newToken = jsonwebtoken.sign(
      { email, userType: "student", verified: true },
      config.JWT.secret,
      { expiresIn: "15m" },
    );
    res.cookie("recoveryCookie", newToken, { maxAge: 15 * 60 * 1000 });
    return res.status(200).json({ message: "Code verified succesfully" });
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

recoveryPasswordController.newPassword = async (req, res) => {
  try {
    const { newPassword, confirmedNewPassword } = req.body;

    if (newPassword !== confirmedNewPassword) {
      return res.status(400).json({ message: "Password doesnt match" });
    }

    const token = req.cookies.recoveryCookie;

    const decoded = jsonwebtoken.verify(token, config.JWT.secret);

    if (!decoded.verified) {
      return res.status(400).json({ message: "Code not verified" });
    }

    const passwordHashed = await bcrypt.hash(newPassword, 10);

    await studentModel.findOneAndUpdate(
      { email: decoded.email },
      { password: passwordHashed },
      { new: true },
    );

    res.clearCookie("recoveryCookie");
    return res.status(200).json({ message: "Password Updated" });
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default recoveryPasswordController