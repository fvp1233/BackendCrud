import dotenv from "dotenv";

dotenv.config();

export const config = {
    JWT: {secret: process.env.JWT_Secret_Key},
    email: {
        user_email: process.env.user_email,
        password_email: process.env.password_email
    }
}