import bcrypt from 'bcrypt'
import User from '../models/User.js';
import Joi from 'joi'
import express from 'express';
import generateAuthToken from '../utils/generateAuthToken.js'
const router = express.Router();

router.post("/", async (req, res) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        email: Joi.string().min(3).max(200).required().email(),
        password: Joi.string().min(6).max(200).required(),
    });

    const { error } = schema.validate(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already exists...");

    console.log("here");

    const { name, email, password } = req.body;

    user = new User({ name, email, password });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    const token = generateAuthToken(user);

    res.send(token);
});

module.exports = router;