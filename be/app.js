const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const sequelize = require('./util/database');
const userRoutes = require('./routes/userRoute')
const expenseRoutes = require('./routes/expenseRoute')


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

sequelize.sync();


app.listen(3000);