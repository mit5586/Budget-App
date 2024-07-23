const express = require('express')
const router = express.Router()
const Users = require('../models/UserModel')
const jwt = require('jsonwebtoken')
const JWT_SECRET = "MitIsAGoodB@@@@iiHALLO"

router.post('/createuser', async (req, res)=>{
    let success = false;
    const {name, email, password} = req.body
    const user = await Users.findOne({email})
    if(user){
        success = false;
        return res.json({success, message: "user with this email already exists"})
    }
    try {
        const user = await Users.create({name, email, password})
        let data = {user: user._id}
        const authToken = jwt.sign(data, JWT_SECRET)
        success = true;
        res.json({success, authToken})

    } catch (error) {
        console.log(error);
        res.status(500).send(`internal server error, ${error.message}`)
    }
})

router.post('/login', async(req, res)=>{
    const {email, password} = req.body;
    let success = false;
    try {
        const user = await Users.findOne({email})
        if(!user){
            return res.status(400).json({success, message: "incorrect credentials"})
        }
        if(password !== user.password){
            return res.status(400).json({success, message: "incorrect credentials"})
        }
        let data = {user: user._id}
        const authToken = jwt.sign(data, JWT_SECRET)
        success = true;
        res.json({success, authToken})
    } catch (error) {
        console.log(error);
        res.status(500).send(`internal server error, ${error.message}`)
    }
})

module.exports = router;