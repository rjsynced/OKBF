import User from '../models/User.js';
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";

class UserService {

    static index = (req, res) => {
        try {
            return res.json({ message: "Hello World" });
        } catch {
            return res.json({ message: "Something went wrong", error: err })
        }
    }

    static register = (req, res) => {
        User.create(req.body)
            .then(user => {
                const userToken = jwt.sign({
                    id: user._id
                }, process.env.SECRET_KEY);
                res
                    .cookie("usertoken", userToken, secret, {
                        httpOnly: true
                    })
                    .json({ msg: "success!", user: user });
            })
            .catch(err => res.json(err));
    }

    static createUser = (req, res) => {
        User.exists({ email: req.body.email })
            .then(userExists => {
                if (userExists) {
                    res.json({ message: "User already exists" })
                } else {
                    User.create({ ...req.body })
                        .then(user => {
                            const userToken = jwt.sign({
                                id: user._id
                            }, process.env.SECRET_KEY)
                            res.cookie("usertoken", userToken, process.env.SECRET_KEY, { httpOnly: true })
                            res.json({ userToken })
                        }
                        )
                        .catch(err => res.status(400).json(err));
                }
            })
    }

    static findAllUsers = async (res) => {
        try {
            return res.status(200).json(await User.find())
        } catch (err) {
            return res.status(500).json(err)
        }
    }

    static getUser = async (req, res) => {
        try {
            return res.status(200).json(await User.findOne({ _id: req.params.id }))
        } catch (err) {
            return res.status(404).json({ message: "Something went wrong", error: err})
        }
    }

    static updateUser = async (req, res) => {
        try {
            const user = await User.findOneAndUpdate({ _id: req.params.id }, { ...req.body }, { new: true, runValidators: [true, "{PATH} is required" ]})
            user._id = req.body._id
            user.firstName = req.body.firstName
            user.lastName = req.body.lastName
            user.email = req.body.email
            user.password = req.body.password
            return res.status(200).json(await user.save())
        } catch {
            return res.status(422).json({ message: "Something went wrong", error: err })
        }
    }

    static deleteUser = async (req, res) => {
        try {
            return res.status(200).json(await User.deleteOne({ _id: req.params.id }))
        } catch (err) {
            return res.status(404).json({ message: "Something went wrong", error: err })
        }
    }

    static login = async (req, res) => {
        const user = await User.findOne({ email: req.body.email });

        if (user === null) {

            // email not found in users collection
            return res.status(400).json({ msg: "User does not exist" });
        }

        // if we made it this far, we found a user with this email address
        // let's compare the supplied password to the hashed password in the database
        const correctPassword = await bcrypt.compare(req.body.password, user.password);

        if (!correctPassword) {
            return res.status(400).json({ msg: "Wrong password" });
        }

        // if we made it this far, the password was correct
        const userToken = jwt.sign({
            id: user._id
        }, process.env.SECRET_KEY);


        // note that the response object allows chained calls to cookie and json
        res
            .cookie("usertoken", userToken, process.env.SECRET_KEY, { httpOnly: true })
            .json({ userToken });

    }

    // Rob turned this into a class, so you'll have to change this to module.exports.getLoggedInUser or something
    static getLoggedInUser = (req, res) => {
        //use the info stored in the cookie to get the id of the logged in user and query the db to find a user with that id, and return with info about the logged in user
        const decodedJWT = jwt.decode(req.cookies.usertoken, { complete: true })
        console.log(decodedJWT, "Decoded")

        // decodedJWT.payload.id, basically parse out the data from the line above
        User.findOne({ _id: decodedJWT.payload.id })
            .then(foundUser => {
                console.log("here")
                res.json({ results: foundUser })
            })
            .catch(err => {
                console.log("here")
                res.json(err)
            })
    }

    static logout = (req, res) => {
        res.clearCookie('usertoken');
        res.sendStatus(200);
    }
}

export default UserService