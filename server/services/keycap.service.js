import Keycap from "../models/Keycap.js"

class KeycapService {
    static findAllKeycaps = async (res) => {
        try {
            return res.status(200).json(await Keycap.find())
        } catch (err) {
            return res.status(500).json(err)
        }
    }

    static findOneKeycap = async (req, res) => {
        try {
            return res.status(200).json(await Keycap.findOne({ _id: req.params.id }))
        } catch (err) {
            return res.status(404).json({ message: "Something went wrong", error: err })
        }
    }

    static createKeycap = async (req, res) => {
        try {
            return res.status(201).json(await Keycap.create(req.body))
        } catch (err) {
            return res.status(422).json({ message: "Something went wrong", error: err })
        }
    }

    static updateKeycap = async (req, res) => {
        try {
            const keycap = await Keycap.findOneAndUpdate({ _id: req.params.id }, {new: true, runValidators: [true, "{PATH} is required"]});
            keycap._id = req.body._id
            keycap.name = req.body.name
            keycap.price = req.body.price
            keycap.brand = req.body.brand
            keycap.quantity = req.body.quantity
            keycap.imgUrlMain = req.body.imgUrlMain
            keycap.imgUrlC1 = req.body.imgUrlC1
            keycap.imgUrlC2 = req.body.imgUrlC2
            keycap.imgUrlC3 = req.body.imgUrlC3
            keycap.imgUrlC4 = req.body.imgUrlC4
            keycap.ytEmbed = req.body.ytEmbed
            keycap.onSale = req.body.onSale
            keycap.material = req.body.material
            keycap.profile = req.body.profile
            keycap.totalKeys = req.body.totalKeys
            keycap.weight = req.body.weight
            keycap.compatibility = req.body.compatibility
            return res.status(200).json(await keycap.save())
        } catch (err) {
            return res.status(422).json({ message: "Something went wrong", error: err })
        }
    }

    static likeKeycap = async (req, res) => {
        try {
            return res.status(200).json(await Keycap.findOneAndUpdate(
                { _id: req.params.id }
            ))} catch (err) {
            return res.status(404).json({ message: "Something went wrong", error: err })
        }
    }

    static deleteKeycap = async (req, res) => {
        try {
            return res.status(200).json(await Keycap.deleteOne({ _id: req.params.id }))
        } catch (err) {
            return res.status(404).json({ message: "Something went wrong", error: err })
        }
    }
}

export default KeycapService
