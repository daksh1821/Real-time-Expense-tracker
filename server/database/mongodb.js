import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();
async function connect() {
  const username = process.env.MONGO_DB_USERNAME;
  const password = process.env.MONGO_DB_PASSWORD;
  const url = process.env.MONGO_DB_URL;
  const fullUrl = `mongodb+srv://${username}:${password}@${url}/?retryWrites=true&w=majority&appName=mern`;
  await mongoose.connect(fullUrl);
  console.log("✅ MongoDB Connected");
}
export default connect;
