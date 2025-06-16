import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import Transaction from './models/transaction.js';
import Transactionapis from "./routes/Transactionapi.js";
import connect from "./database/mongodb.js";
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.send('Hello World!');
    }
);
app.use("/transactions", Transactionapis);
await connect();
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    }
);
