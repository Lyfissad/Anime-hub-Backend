import mongoose from "mongoose"



const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required:true,
        unique:true
    },
    preferences:{
        type: [String],
        default:[]
    }  
}, {timestamps:true})



const User = mongoose.model("Users", UserSchema);

export default User