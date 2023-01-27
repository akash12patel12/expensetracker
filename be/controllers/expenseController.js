const Expense  = require('../models/expense')
exports.addex = (req,res)=>{
    Expense.create({
        amount : req.body.amount,
        desc : req.body.desc,
        cat : req.body.cat,
        userEmId : req.user.userId

    }).then(result=>{
        res.status(201).json(result);
    }).catch(err=>{
        res.json(err);
    })
}

exports.getAll =(req,res)=>{
    // console.log(req.user);

    Expense.findAll({where : {userEmId: req.user.userId}}).then(result=>{
        res.json(result)
    })
}