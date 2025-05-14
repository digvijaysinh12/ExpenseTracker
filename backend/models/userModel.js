import mongoose from "mongoose";

//schema design
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'namme is required'],
        trim: true
    },
    email:{
        type:String,
        required:[true,'email is required and should be unique'],
        unique:true,
        trim:true
    },
    username: {
  type: String,
  unique: true,  // Keep uniqueness if needed
  required: false // This allows null/undefined values
}
,
    password:{
        type:String,
        required:[true, 'password is required'],
    },
    role:
    {
        type:String,
        enum:['Admin','User'],
        default:"User",
    }
},
{timestamps:true}
);

//export
const userModel = mongoose.model('users', userSchema)
export default userModel