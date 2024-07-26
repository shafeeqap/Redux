import { User } from "../models/users.js";

const getUsers = async (req, res) =>{
    try {
        const users = await User.find();
        
    } catch (error) {
        res.status(500).json({messag: error.message})
    }
}


export {getUsers}