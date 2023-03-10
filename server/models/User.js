import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const { Schema, model } = mongoose
const UserSchema = new Schema (
    {
        firstName: {
            type: String,
            required: [true, "First name is required"]
        },
        lastName: {
            type: String,
            required: [true, "Last name is required"]
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            validate: {
                validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
                message: "Please enter a valid email"
            }
        },
        password: {
            type: String,
            required: [true, "The password is required"],
            minlength: [8, "Password must be 8 characters or longer"]
        },
    }, { timestamps: true });
    
    const User = model("User", UserSchema)
    
    UserSchema.virtual('confirmPassword')
        .get(() => this._confirmPassword)
        .set(value => this._confirmPassword = value);
    
    UserSchema.pre('validate', function (next) {
        if (this.password !== this.confirmPassword) {
            this.invalidate('confirmPassword', 'Password must match confirm password');
        }
        next();
    });
    
    UserSchema.pre('save', function (next) {
        bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        });
    });
    
export default User