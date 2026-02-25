import mongoose from "mongoose";
import { Roles, Gender } from "../enums/index.js";

let userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    phoneNumber: { type: String, unique: true },
    email: { type: String, unique: true },
    userName: { type: String, unique: true, required: true },
    hashedPassword: { type: String, required: true },
    role: {
        type: String,
        enum: [
            Roles.FOUNDER, Roles.MANAGER, Roles.WORKER, Roles.CUSTOMER
        ],
        required: true
    },
    gender: { type: String, enum: [Gender.MALE, Gender.FEMALE], required: true }
}, {
    versionKey: false,
    timestamps: true
})

export default new mongoose.model("User", userSchema)