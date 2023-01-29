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


exports.updatePayment = (req,res)=>{
    console.log(req.body);
    console.log(req.user);
    Order.update(
        {
            'paymentid' : req.body.payment_id,
            'status' : "SUCCESSFUL"
        },
        {
             where : {'orderid' : req.body.order_id}
        }
    ).then(()=>{
        res.status(201).json({msg : 'updated'})
    }).catch(err=>{
        console.log(err);
    })
   
}