import {Router} from "express";
import User from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
export const register = async (req, res) => {
    try {
      const { email, password, firstName, lastName } = req.body;
  
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(406).json({ message: "User already exists" });
      }
      const saltRounds = 10;
      const salt = await bcrypt.genSaltSync(saltRounds);
      const hashedPassword = await bcrypt.hashSync(password, salt);

      const user = new User({ email, password:hashedPassword, firstName, lastName});
      const savedUser = await user.save();
      console.log(savedUser);
  
      res.status(201).json({ message: "User is registered", user: savedUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  export const login = async(req,res)=>{
    const {email,password} = req.body;
    const userExists = await User.findOne({email});
    if (!userExists) {
        return res.status(406).json({ message: "Credentials not matched" });
        return;
    }
    const matched = await bcrypt.compare(password,userExists.password);
    if(!matched){
        return res.status(406).json({ message: "Credentials not matched" });
        return;
    }
    const payload = {
        sub: userExists._id, // ✅ `sub` is the standard claim for user ID
        email: userExists.email,
    };
    
    const token  = jwt.sign(payload, process.env.JWT_SECRET);
    res.json({message:"successfully logged in,",token,userExists});
};
