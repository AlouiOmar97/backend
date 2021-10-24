const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const historyService = require('./history.service');

// routes

router.post('/add', addSchema, add);
router.get('/',  getAll);
router.get('/user/:id',  getHistoryByUserId);
router.get('/current', authorize(), getCurrent);
router.get('/:id', authorize(), getById);
router.put('/:id', authorize(), updateSchema, update);
router.delete('/:id',  _delete);

module.exports = router;





function addSchema(req, res, next) {
    const schema = Joi.object({
        transactionType: Joi.string().required(),
        amount: Joi.number().required(),
        date: Joi.string().required(),
        id_user: Joi.number().required()
    });
    validateRequest(req, next, schema);
}

function add(req, res, next) {
    historyService.create(req.body)
        .then(() => res.json({ message: 'Transaction successful' }))
        .catch(next);
}

function getAll(req, res, next) {
    historyService.getAll()
        .then(historys => res.json(historys))
        .catch(next);
}

function getCurrent(req, res, next) {
    res.json(req.history);
}

function getById(req, res, next) {
    historyService.getById(req.params.id)
        .then(history => res.json(history))
        .catch(next);
}

function getHistoryByUserId(req, res, next) {
    historyService.getUserHistory(req.params.id)
        .then(history => res.json(history))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        transactionType: Joi.string().required(),
        amount: Joi.number().required(),
        date: Joi.string().required(),
        id_user: Joi.number().required()
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    historyService.update(req.params.id, req.body)
        .then(history => res.json(history))
        .catch(next);
}

function _delete(req, res, next) {
    historyService.delete(req.params.id)
        .then(() => res.json({ message: 'Transaction deleted successfully' }))
        .catch(next);
}