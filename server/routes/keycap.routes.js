import express from 'express'
import KeycapService from '../services/keycap.service.js'
const keycapRouter = new express.Router()

keycapRouter.get("/", (req, res) => KeycapService.findAllKeycaps(res))
keycapRouter.get("/:id", (req, res) => KeycapService.findOneKeycap(req, res))
keycapRouter.post("/new", (req, res) => KeycapService.createKeycap(req, res))
keycapRouter.put("/:id/edit", (req, res) => KeycapService.updateKeycap(req, res))
keycapRouter.delete("/:id/delete", (req, res) => KeycapService.deleteKeycap(req, res))

export default keycapRouter