import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required : true,
    },
    phone:{
        type: String,
        required: true
    },
    profileImage:{
        type: String,
        default: '',
    }
});

export const User = mongoose.model('User', UserSchema);