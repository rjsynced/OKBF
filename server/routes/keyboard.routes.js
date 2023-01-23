import express from 'express'
import KeyboardService from '../services/keyboard.service.js'
const keyboardRouter = new express.Router()

keyboardRouter.get("/", (req, res) => KeyboardService.findAllKeyboards(res))
keyboardRouter.get("/:id", (req, res) => KeyboardService.findOneKeyboard(req, res))
keyboardRouter.post("/new", (req, res) => KeyboardService.createKeyboard(req, res))
keyboardRouter.put("/:id/edit", (req, res) => KeyboardService.updateKeyboard(req, res))
keyboardRouter.delete("/:id/delete", (req, res) => KeyboardService.deleteKeyboard(req, res))

export default keyboardRouter