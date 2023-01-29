require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./util/database');
const userRoutes = require('./routes/userRoute')
const expenseRoutes = require('./routes/expenseRoute')
const premiumRoutes = require('./routes/premiumRoute');
const Expense  = require('./models/expense')
const User = require("./models/user");
const Order = require('./models/order');

console.log(process.env)
const app = express();
// console.log("ran")
app.use(cors());
app.use(bodyParser.json());
// app.get("/",(req ,res)=>{
//     console.log("from app.js")
//     res.send("shshhs")
// })
app.use(userRoutes);
app.use(expenseRoutes);
app.use(premiumRoutes);



User.hasMany(Expense);
Expense.belongsTo(User);
User.hasMany(Order);
Order.belongsTo(User);

sequelize.sync();


app.listen(3000);