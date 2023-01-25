const Expense  = require('../models/expense')

exports.addex = (req,res)=>{
    
    Expense.create({
        amount : req.body.amount,
        desc : req.body.desc,
        cat : req.body.cat
    }).then(result=>{
        res.status(201).json(result);
    }).catch(err=>{
        res.json(err);
    })
}

exports.getAll =(req,res)=>{
    Expense.findAll().then(result=>{
        res.json(result)
    })
}