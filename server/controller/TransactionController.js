import Transaction from "../models/Transaction.js";
export const index = async (req,res)=>{
    const transaction = await Transaction.find({user_id:req.user._id}).sort({createdAt: -1});   
    const demo = await Transaction.aggregate([
        {
            $match:{user_id:req.user._id},
        },
        {
            $group: {
                _id: {$month: "$date"},
                transactions: {$push:{
                    _id:"$_id",
                    amount:"$amount",
                    description:"$description",
                    date:"$date"},},
                totalExpenses: {$sum: "$amount"},
            },
        },
    ]);
    res.json({data:demo});
};
export const create = async (req,res)=>{ 
    console.log("Transaction received:", req.body);
    const transaction = new Transaction({
        amount: req.body.amount,
        description: req.body.description,
        user_id: req.user._id,
        date: req.body.date ? new Date(req.body.date) : new Date(),
        category_id: req.body.category_id,
    });
    await transaction.save();
    console.log("Transaction saved:", transaction);
    res.send({messege: "Hello World"});
};
export const del = async(req,res)=>{
    await Transaction.findOneAndDelete({_id:req.params.id});
    res.json({messege: "Success"});
}

export const upd = async(req,res)=>{
    await Transaction.updateOne({_id: req.params.id},{$set :req.body});
    res.json({messege:"success"});
}