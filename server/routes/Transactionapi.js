import {Router} from 'express';
const router = Router();
import Transaction from '../models/transaction.js';

router.get("/",async (req,res)=>{
    const transaction = await Transaction.find({}).sort({createdAt: -1});
    res.json({data: transaction});
});
router.post("/",async (req,res)=>{
    console.log("Transaction received:", req.body);
    const transaction = new Transaction({
        amount: req.body.amount,
        description: req.body.description,
        date: req.body.date ? new Date(req.body.date) : new Date(),
    });
    await transaction.save();
    console.log("Transaction saved:", transaction);
    res.send({messege: "Hello World"});
});
router.delete("/:id",async(req,res)=>{
    await Transaction.findOneAndDelete({_id:req.params.id});
    res.json({messege: "Success"});
});

router.patch("/:id",async(req,res)=>{
    await Transaction.updateOne({_id: req.params.id},{$set :req.body});
    res.json({messege:"success"});
})
export default router; 