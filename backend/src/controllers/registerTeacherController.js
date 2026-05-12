import nodemailer from "nodemailer";
import crypto from "crypto";
import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { config } from "../../config.js";
import teachersModel from "../models/teachers.js";

const registerTeacherController = {};

registerTeacherController.register = async (req, res) => {
  try {
    const {
      name,
      lastName,
      email,
      password,
      phone,
      speciality,
      isActive,
      isVerified,
      loginAttemps,
      timeOut,
    } = req.body;

    const existTeacher = await teachersModel.findOne({ email });

    if (existTeacher) {
      return res.status(400).json({ message: "Teacher already Exists" });
    }

    const passwordHashed = await bcryptjs.hash(password, 10);

    const randomCode = crypto.randomBytes(3).toString("hex");

    const token = jsonwebtoken.sign(
      {
        randomCode,
        name,
        lastName,
        email,
        password: passwordHashed,
        phone,
        speciality,
        isActive,
        isVerified,
        loginAttemps,
        timeOut,
      },
      config.JWT.secret,
      { expiresIn: "15m" },
    );

    res.cookie("registrationCookie", token, { maxAge: 15 * 60 * 1000 });

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
      subject: "Verificación de cuenta",
      text:
        "Para verficiar tu cuenta, utiliza este código " +
        randomCode +
        " expira en 15 minutos.",
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

registerTeacherController.verifyCode = async (req, res) => {
  try {
    const { verificationCodeRequest } = req.body;

    const token = req.cookies.registrationCookie;

    const decoded = jsonwebtoken.verify(token, config.JWT.secret);

    const {
      randomCode: storedCode,
      name,
      lastName,
      email,
      password,
      phone,
      speciality,
      isActive,
      isVerified,
      loginAttemps,
      timeOut,
    } = decoded;

    if (verificationCodeRequest !== storedCode) {
      return res.status(400).json({ message: "Invalid Code" });
    }

    const newTeacher = teachersModel({
      name,
      lastName,
      email,
      password,
      phone,
      speciality,
      isActive: true,
      isVerified: true,
    });
    await newTeacher.save();
    res.clearCookie("registrationCookie")
    return res.status(200).json({message: "Teacher register"})
  } catch (error) {
    console.log("error" + error)
    return res.status(500).json({meesage: "Internal server error"})
  }
};
export default registerTeacherController