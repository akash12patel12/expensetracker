const Expense = require("../models/expense");
const User = require("../models/user");

exports.addex = (req, res) => {
  Expense.create({
    amount: req.body.amount,
    desc: req.body.desc,
    cat: req.body.cat,
    userEmId: req.user.userId,
  })
    .then((result) => {
      User.increment('totalExpenses', { by: req.body.amount, where: { id: req.user.userId} });
      res.status(201).json(result);
    })
    .catch((err) => {
      res.json(err);
    });
};

exports.getAll = (req, res) => {
  // console.log(req.user);

  Expense.findAll({ where: { userEmId: req.user.userId } , attributes : ['id','desc' , 'amount', 'cat'] }).then((result) => {
    res.json(result);
  });
};

exports.deleteOne = (req, res) => {
  console.log(req.body);
  Expense.findByPk(req.body.id).then((expense) => {
    if (expense) {
      if (expense.userEmId === req.user.userId) {
        User.decrement('totalExpenses', { by:  expense.amount, where: { id: req.user.userId} });
        Expense.destroy({ where: { id: req.body.id } }).then((respo) => {
          console.log(respo);
          
          res.json(respo);
        });
      } else {
        console.log("Not loggedin");
      }
    }
  });
};
