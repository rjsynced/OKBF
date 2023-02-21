import express from 'express'
import UserService from '../services/user.service.js'

const userRouter = new express.Router()

userRouter.post("/register"), (req, res) => UserService.register(req,res)
userRouter.get("/", (req, res) => UserService.findAllUsers(res))
userRouter.get("/:id", (req, res) => UserService.findOneUser(req, res))
userRouter.post("/new", (req, res) => UserService.createUser(req, res))
userRouter.put("/:id/edit", (req, res) => UserService.updateUser(req, res))
userRouter.delete("/:id/delete", (req, res) => UserService.deleteUser(req, res))

export default userRouter

