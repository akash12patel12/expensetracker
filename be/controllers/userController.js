const User = require('../models/user');

exports.register =(req ,res)=>{
    User.create({name: req.body.name, email : req.body.email, password : req.body.password, phone : req.body.phone }).then(r=>{
        res.json(r);
    }).catch(err=>{
        console.log(err.errors[0].message);

        res.json({errorMsg : err.errors[0].message})
    })
    // console.log(req.body);
}