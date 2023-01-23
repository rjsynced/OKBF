import mongoose from "mongoose";

const { Schema, model } = mongoose

const kcSchema = new Schema(
    {
        _id: {
            type: String,
            required: [true, "The id is required"]
        },
        name: {
            type: String,
            required: [true, "The name is required"]
        },
        price: {
            type: Number,
            required: [true, "The price is required"]

        },
        brand: {
            type: String,
            required: [true, "The brand is required"]

        },
        quantity: {
            type: Number,
            required: [true, "The quantity is required"]
        },
        imgUrlMain: {
            data: Buffer,
            type: String,
            required: [true, "The image is required"]
        },
        imgUrlC1: {
            data: Buffer,
            type: String,
        },
        imgUrlC2: {
            data: Buffer,
            type: String,
        },
        imgUrlC3: {
            data: Buffer,
            type: String,
        },
        imgUrlC4: {
            data: Buffer,
            type: String,
        },
        ytEmbed: {
            type: String
        },
        onSale: {
            type: Boolean,
            default: false
        },
        material: {
            type: String
        },
        profile: {
            type: String
        },
        totalKeys: {
            type: String
        },
        weight: {
            type: String
        },
        compatibility: {
            type: String
        }
});

const Keycap = model("Keycap", kcSchema)

export default Keycap