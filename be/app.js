const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const userRoutes = require('./routes/userRoute')


const app = express();
app.use(cors);

app.use(userRoutes);
app.use(bodyParser.json());



app.listen(3000);