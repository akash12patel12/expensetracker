const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const userRoutes = require('./routes/userRoute')


const app = express();
// console.log("ran")
app.use(cors());
app.use(bodyParser.json());
// app.get("/",(req ,res)=>{
//     console.log("from app.js")
//     res.send("shshhs")
// })
app.use(userRoutes);




app.listen(3000);