import mongoose from 'mongoose'

const { Schema, model } = mongoose

const orderSchema = new Schema (
    {
        userId: {
            type: String,
            required: [true, "The name is required"]
        },
        products: [
            {
                productId: {
                    type: String,
                },
                quantity: {
                    type: String,
                    default: 1
                }            
            }
        ],
        subtotal: {
            type: Number,
            required: [true, "The subtotal is requierd"]
        },
        total: {
            type: Number,
            required: [true, "The total is requierd"]
        },
        shipping: {
            type: Object,
            required: [true, "The shipping is requierd"]
        },
        delivery_status: {
            type: String,
            default: "pending",
        },
        payment_status: {
            type: String,
            required: [true, "The payment is requierd"]
        }
    }, { timestamps: true });

const Order = model("Order", orderSchema)

export default Order