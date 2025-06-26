import mongoose from "mongoose";
const {Schema} = mongoose;
const userSchema = new Schema({
    firstName: {type:String, required:["First name feild is required"]},
    lastName: {type:String, required:["First name feild is required"]},
    email: {type:String, required:["First name feild is required"]},
    password: {type:String, required:["First name feild is required"]},
},
{
    timestamps: true,
}
);

export default new mongoose.model("User", userSchema)