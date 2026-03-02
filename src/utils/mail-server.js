import nodemailer from "nodemailer"
import { envConfig } from "../config/index.js"

export let sendMail = async (user, message) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        host: envConfig.MAIL.HOST,
        port: envConfig.MAIL.PORT,
        auth: {
            user: envConfig.MAIL.USER,
            pass: envConfig.MAIL.PASS
        }
    })

    let mailOptions = {
        from: envConfig.MAIL.USER,
        to: user,
        subject: "Bookstore",
        text: message
    }

    let res = transporter.sendMail(mailOptions)
    return res
}