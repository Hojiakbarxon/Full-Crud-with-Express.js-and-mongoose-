import mongoose from "mongoose";

let bookSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    year: { type: Number },
    author: { ref: "Author", type: mongoose.Schema.Types.ObjectId, required: true }
}, {
    versionKey: false,
    timestamps: true
})

export default mongoose.model("Book", bookSchema)