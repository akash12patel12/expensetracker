const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

exports.register = (req, res) => {
  bcrypt.hash(req.body.password, 3, function (err, hash) {
    // Store hash in your password DB.
    if (!err) {
      User.create({
        name: req.body.name,
        email: req.body.email,
        password: hash,
        phone: req.body.phone,
        totalExpenses :  0
      })
        .then((r) => {
          res.json(r);
        })
        .catch((err) => {
          // console.log(err.errors[0].message);

          res.json({ errorMsg: err.errors[0].message });
        });
    } else {
      res.json(err);
    }
  });
};

exports.login = (req, res) => {
  
  User.findOne({ where: { email: req.body.email } }).then((u) => {
    if (u) {
        
     bcrypt.compare(req.body.password, u.password ,  (err, result)=>{
         if(result){
          res.status(200).json({message : "Login success", token :  generateToken(u.id)});
          
         }
         else{
          res.status(400).json({ err : err, message : "Login Failed,  Password Incorrect"})
         }
     })
    } else {
      res.status(404).json({ message: "user not found" });
    }
  });
};


exports.forgotPassword =(req,res)=>{
  console.log("ForgotPassword evoked on email :", req.body.email);
}

function generateToken(id){
  return jwt.sign({userId : id},  'secretkey');
}




