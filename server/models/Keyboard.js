import mongoose from "mongoose";

const { Schema, model } = mongoose

const kbSchema = new Schema(
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
            required: [true, "The price is required"]

        },
        quantity: {
            type: Number,
            required: [true, "The quantity is required"]
        },
        imgUrlMain: {
            data: Buffer,
            type: String,
            required: [true, "The Img is required"]
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
        case: {
            type: String
        },
        plate: {
            type: String
        },
        pcb: {
            type: String
        },
        keycaps: {
            type: String
        },
        switches: {
            type: String
        },
        compatibility: {
            type: String
        },
        typingAngle: {
            type: Number
        },
        weight: {
            type: Number
        }

});

const Keyboard = model("Keyboard", kbSchema)

export default Keyboard