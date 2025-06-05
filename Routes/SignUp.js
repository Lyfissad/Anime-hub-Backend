import express from "express"
const router = express.Router()
import bcrypt from "bcrypt"
import User from "../models/Users.js"



router.post("/signup", async (req, res)=>{
        try{
            const {username, email, password, preferences} = req.body
        
        const existingUser = await User.findOne({$or: [{username}, {email}]});
        
        if (existingUser){
            return res.status(400).json({message : "User already exists"});
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            preferences
        });

        await newUser.save();

        res.status(201).json({message : "New user created successfully"});

        }catch(err){
            console.log("Error in creating User:", err.message);
            res.status(500).json({message: "server error"});

        }

});


export default router;