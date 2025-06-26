import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import Transaction from './models/transaction.js';
import Transactionapis from "./routes/Transactionapi.js";
import connect from "./database/mongodb.js";
import AuthApi from "./routes/AuthApi.js"
import passport from 'passport';
import passportConfig from './config/passport.js';
import * as  dotenv from 'dotenv';
import UserApi from "./routes/UserApi.js"; 
import routes from "./routes/index.js";
dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
passportConfig(passport);   
app.get('/', (req, res) => {
    res.send('Hello World!');
    }
);
app.use('/',routes);
await connect();
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    }
);
