import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const { Schema, model } = mongoose
const UserSchema = new Schema (
    {
        name: {
            type: String,
            required: [true, "The name is required"]
        },
        email: {
            type: String,
            required: [true, "The email is required"]
        },
        password: {
            type: String,
            required: [true, "The password is required"],
            minlength: [8, "Password must be 8 characters or longer"]
        },
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email"
        },
        isAdmin: {
            type: Boolean,
            default: false
        }
    }, { timestamps: true });

const User = model("User", UserSchema)

    // add this after UserSchema is defined
    UserSchema.virtual('confirmPassword')
        .get(() => this._confirmPassword)
        .set(value => this._confirmPassword = value);

    // this should go after 
    UserSchema.pre('save', function (next) {
        bcrypt.hash(this.password, 10)
            .then(hash => {
                this.password = hash;
                next();
            });
    });

export default User