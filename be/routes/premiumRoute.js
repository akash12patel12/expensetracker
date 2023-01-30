const express = require('express');
const userAuth = require('../middlewares/auth')
const premiumController = require('../controllers/premiumController')
const router = express.Router();

router.get('/premium', userAuth.authenticate, premiumController.purchase)
router.post('/updatePayment', userAuth.authenticate, premiumController.updatePayment);
router.get('/checkpremium', userAuth.authenticate, premiumController.check);
module.exports = router;