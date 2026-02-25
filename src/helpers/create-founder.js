import User from "../schemas/users-schama.js"
import { envConfig } from "../config/index.js"
import { Gender, Roles } from "../enums/index.js"
import Crypto from "../crypto/crypto.js"
export async function createFounder() {
    try {
        let existedFounder = await User.findOne({ role: Roles.FOUNDER })
        if (!existedFounder) {
            let founder = await User.create({
                fullName: "Hojiakbarxon Olimxo`jayev",
                phoneNumber: "+998930055678",
                email: "hojiakbar@gmail.com",
                userName: envConfig.FOUNDER.USERNAME,
                hashedPassword: await Crypto.decode(envConfig.FOUNDER.PASSWORD),
                role: Roles.FOUNDER,
                gender: Gender.MALE
            })
            console.log(`Founder has been created successfully`, founder)
        }
    } catch (error) {
        console.log(`Error while creating founder`, error)
    }
}