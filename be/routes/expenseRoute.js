const express = require('express');
const expenseController = require('../controllers/expenseController');

const router = express.Router();

router.post('/addex', expenseController.addex);
router.get('/getAll', expenseController.getAll );

module.exports = router;