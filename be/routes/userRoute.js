const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');


router.post('/register', ()=>{
    console.log("here in route");
});

module.exports = router;