import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
    reqShaker: String,
    requestTitle: String,
    requestDescription: String,
    charges: String,
    country: String,
    city: String,
    landmark: String,
    phone: String,
    expiresOn: String
}, {timestamps: true})

export const Requests = mongoose.model("Requests", requestSchema)