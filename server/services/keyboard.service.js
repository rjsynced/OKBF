import Keyboard from "../models/Keyboard.js"

class KeyboardService {
    static findAllKeyboards = async (res) => {
        try {
            return res.status(200).json(await Keyboard.find())
        } catch (err) {
            return res.status(500).json(err)
        }
    }

    static findOneKeyboard = async (req, res) => {
        try {
            return res.status(200).json(await Keyboard.findOne({ _id: req.params.id }))
        } catch (err) {
            return res.status(404).json({ message: "Something went wrong", error: err })
        }
    }

    static createKeyboard = async (req, res) => {
        try {
            return res.status(201).json(await Keyboard.create(req.body))
        } catch (err) {
            return res.status(422).json({ message: "Something went wrong", error: err })
        }
    }

    static updateKeyboard = async (req, res) => {
        console.log(req.body);
        try {
            const keyboard = await Keyboard.findOneAndUpdate({ _id: req.params.id }, {new: true, runValidators: [true, "{PATH} is required"]});
            keyboard._id = req.body._id
            keyboard.name = req.body.name
            keyboard.price = req.body.price
            keyboard.brand = req.body.brand
            keyboard.quantity = req.body.quantity
            keyboard.imgUrlMain = req.body.imgUrlMain
            keyboard.imgUrlC1 = req.body.imgUrlC1
            keyboard.imgUrlC2 = req.body.imgUrlC2
            keyboard.imgUrlC3 = req.body.imgUrlC3
            keyboard.imgUrlC4 = req.body.imgUrlC4
            keyboard.ytEmbed = req.body.ytEmbed
            keyboard.onSale = req.body.onSale
            keyboard.case = req.body.case
            keyboard.plate = req.body.plate
            keyboard.pcb = req.body.pcb
            keyboard.keycaps = req.body.keycaps
            keyboard.switches = req.body.switches
            keyboard.compatibility = req.body.compatibility
            keyboard.typingAngle = req.body.typingAngle
            keyboard.weight = req.body.weight
            return res.status(200).json(await keyboard.save())
        } catch (err) {
            console.log(err)
            return res.status(422).json({ message: "Something went wrong", error: err })
        }
    }
    
    static likeKeyboard = async (req, res) => {
        try {
            return res.status(200).json(await Keyboard.findOneAndUpdate(
                { _id: req.params.id }
            ))} catch (err) {
            return res.status(404).json({ message: "Something went wrong", error: err })
        }
    }

    static deleteKeyboard = async (req, res) => {
        try {
            return res.status(200).json(await Keyboard.deleteOne({ _id: req.params.id }))
        } catch (err) {
            return res.status(404).json({ message: "Something went wrong", error: err })
        }
    }
}

export default KeyboardService
