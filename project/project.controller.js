const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const projectService = require('./project.service');

// routes

router.post('/add', addSchema, add);
router.post('/invest', invest);
router.get('/',  getAll);
router.get('/user/:id',  getProjectByUserId);
router.get('/current', authorize(), getCurrent);
router.get('/:id',  getById);
router.put('/:id', authorize(), updateSchema, update);
router.delete('/:id',  _delete);

module.exports = router;





function addSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
    });
    validateRequest(req, next, schema);
}

function add(req, res, next) {
    projectService.create(req.body)
        .then(() => res.json({ message: 'Project added successfully' }))
        .catch(next);
}

function getAll(req, res, next) {
    projectService.getAll()
        .then(projects => res.json(projects))
        .catch(next);
}

function getCurrent(req, res, next) {
    res.json(req.project);
}

function getById(req, res, next) {
    projectService.getById(req.params.id)
        .then(project => res.json(project))
        .catch(next);
}

function getProjectByUserId(req, res, next) {
    projectService.getUserProject(req.params.id)
        .then(project => res.json(project))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        funds: Joi.number().required()
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    projectService.update(req.params.id, req.body)
        .then(project => res.json(project))
        .catch(next);
}

function invest(req, res, next) {
    console.log("invest method");
    console.log(req.body.amount+ req.body.userId+req.body.projectId);
    projectService.invest(req.body.amount, req.body.userId,req.body.projectId)
        .then(project => res.json(project))
        .catch(next);
}

function _delete(req, res, next) {
    projectService.delete(req.params.id)
        .then(() => res.json({ message: 'Project deleted successfully' }))
        .catch(next);
}