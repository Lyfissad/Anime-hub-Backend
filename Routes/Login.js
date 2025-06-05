import express from "express"
const router = express.Router()
import bcrypt from "bcrypt"
import User from "../models/Users.js"




router.post("/login", async (req, res)=>{
    try{
        const {username, password} = req.body


        const existingUser = await User.findOne({username})

        if(!existingUser){
            return res.status(404).json({message: "User does not exist."})
        }
        const PassIsMatch = await bcrypt.compare(password, existingUser.password)

        if(!PassIsMatch){
            return res.status(401).json({message: "invalid credentials"})
        }

        res.status(200).json({
            message: "Login successful",
            User: {
                username: existingUser.username,
                preferences: existingUser.preferences,
                email: existingUser.email
            }
        })
    }
    catch(err){
        console.error("there was an error logging in: ", err)
        res.status(500).json({message: "server error"})
    }
})


export default router