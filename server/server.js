import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
const app = express();
app.use(cors());
app.get('/', (req, res) => {
    res.send('Hello World!');
    }
);
await mongoose.connect("mongodb+srv://daksh2872004:yMxhMcc7YenfnGHW@mern.35l4jl6.mongodb.net/?retryWrites=true&w=majority&appName=mern");
console.log("Mongo db Connected");
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    }
);