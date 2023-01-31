const User = require("../models/user");
const Sib = require("sib-api-v3-sdk");
require("dotenv").config();
const client = Sib.ApiClient.instance;

exports.forgotPassword = (req, res) => {

  console.log(process.env.MAIL_API_KEY);
  // const apiKey = client.authentications["api-key"];
  // apiKey.apiKey = process.env.MAIL_API_KEY;

  // const tranEmailApi = new Sib.TransactionalEmailsApi();

  // const sender = {
  //   email: "akash12patel12@gmail.com",
  // };

  // const reciever = [
  //   {
  //     email: req.body.email,
  //   },
  // ];
  // tranEmailApi
  //   .sendTransacEmail({
  //     sender,
  //     to: reciever,
  //     subject: "TEst Forgot Password Email",
  //     textContent: "Hello Test Successfull",
  //     htmlContent : ` <a href="http://localhost:3000/password/resetpassword/${id}">Reset password</a>`
  //   })
  //   .then((response) => {
  //     res.status(201).json(response);
  //   })
  //   .catch(console.log);
};
