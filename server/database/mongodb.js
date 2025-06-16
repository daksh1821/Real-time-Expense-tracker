import mongoose from "mongoose";
async function connect(){
    await mongoose.connect("mongodb+srv://daksh2872004:yMxhMcc7YenfnGHW@mern.35l4jl6.mongodb.net/?retryWrites=true&w=majority&appName=mern");
    console.log("Mongo db Connected");
}
export default connect;