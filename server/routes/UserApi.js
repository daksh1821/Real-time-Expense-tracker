import {Router} from "express";
import User from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import * as UserController from '../controller/UserController.js';
const router = Router();
router.get('/',passport.authenticate('jwt', { session: false }),UserController.index);
export default router; 