import mongoose from "mongoose";

let authorSchema = new mongoose.Schema({
    fullName: { type: String, unique: true, required: true },
    birthDate: { type: Number },
    country: { type: String, required: true }
}, {
    versionKey: false,
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

authorSchema.virtual('books', {
    ref: "Book",
    localField: "_id",
    foreignField: "author"
})
export default mongoose.model("Author", authorSchema)