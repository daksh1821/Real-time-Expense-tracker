import {Router} from "express";
import User from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as AuthController from "../controller/AuthController.js";
const router = Router();
router.post('/register', AuthController.register);

router.post('/login',AuthController.login);
export default router; 