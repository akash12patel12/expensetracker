const User = require("../models/user");
const Order = require("../models/order");
const jwt = require("jsonwebtoken");
const Razorpay = require("razorpay");
require("dotenv").config();

exports.purchase = (req, res) => {
  // console.log(req.user);
  var rzp = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.SECRET_KEY,
  });
  const amount = 2500;
  rzp.orders.create({ amount, currency: "INR" }, (err, order) => {
    Order.create({
      orderid: order.id,
      userEmId: req.user.userId,
      status: "Pending",
    })
      .then(() => {
        res.status(201).json({ order, key_id: rzp.key_id });
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

exports.updatePayment = (req, res) => {
  
  Order.update(
    {
      paymentid: req.body.payment_id,
      status: "SUCCESSFUL",
    },
    {
      where: { orderid: req.body.order_id },
    }
  )
    .then(() => {
      User.update(
        {
          isPremium: true,
        },
        {
          where: { id: req.user.userId },
        }
      )
        .then(() => {
          res.status(201).json({ msg: "updated" });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};


exports.check  = async (req,res)=>{
  // console.log("controllewr working");
   const user = await User.findByPk(req.user.userId);
   if(user.isPremium){
     res.status(201).json({isPremium : true});
   }
   else
    res.status(202).json({isPremium : false});
}


exports.getLeaderBoard = async (req,res)=> {
   User.findByPk(req.user.userId)
   .then(async user=>{
    if(user.isPremium){
      const allUsers = await User.findAll({order : [['totalExpenses', 'DESC']]});
      res.status(201).json(allUsers)
    }
    else {
      res.status(401).json({Message : "Please Buy Premium To See LeaderBoard"})
    }
   })
   
}
