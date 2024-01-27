const { UserModel } = require('../models/User.model')
const express = require('express')
const userRouter = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')



userRouter.post('/register', async (req, res) => {
    console.log("Inside register...")
    const { name, avatar, email, password } = req.body
    try {
        const existingUser = await UserModel.findOne({ email })
        if (existingUser) {
            return res.status(401).send('User with this email already exists')
        }
        bcrypt.hash(password, 5, async (req, hash) => {
            const user = new UserModel({ name, email, avatar, password: hash })
            await user.save()
            res.status(200).json({ 'msg': 'Register Successfull !' })
        })
    } catch (err) {
        res.status(400).json({ 'err': err.message })
    }
})

userRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email })
        if (user) {
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    const token = jwt.sign({ userID: user._id, user: user.name }, 'Masai_School')
                    res.status(200).json({ 'msg': 'Login Success', 'token': token, user: user.name })
                } else {
                    res.json('Wrong Password!')
                }
            })
        } else {
            res.json("User not Found")
        }
    } catch (err) {
        res.status(400).json({ 'err': err.message })
    }
})



module.exports = { userRouter }