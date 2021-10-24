const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const payService = require('./pay.service');

// routes

router.post('/payment',  payService.pay);
router.get('/success',  payService.success);
router.get('/cancel', payService.cancel);

module.exports = router;




