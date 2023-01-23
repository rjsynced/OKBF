import bcrypt from 'bcrypt'
import User from '../models/User.js';
import Joi from 'joi'
import express from 'express';
import generateAuthToken from '../utils/generateAuthToken.js'
const router = express.Router();

router.post("/", async (req, res) => {
    const schema = Joi.object({
        email: Joi.string().min(3).max(200).required().email(),
        password: Joi.string().min(6).max(200).required(),
    });

    const { error } = schema.validate(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Invalid email or password...");

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword)
        return res.status(400).send("Invalid email or password...");

    const token = generateAuthToken(user);

    res.send(token);
});

module.exports = router;