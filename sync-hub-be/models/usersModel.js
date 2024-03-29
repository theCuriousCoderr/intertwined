import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: String,
    email:String ,
    address: String,
    phone: String,
    photo: String,
    dept: String,
    level: String,
    matricNo: String,
    password: String,
    chatWallPaper: { type: String, default: '' }
})
export const Users = mongoose.model("Users", userSchema)

