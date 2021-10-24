const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const userService = require('../users/user.service');
const historyService = require('../history/history.service');

module.exports = {
    
    getAll,
    getById,
    create,
    update,
    invest,
    getUserProject,
    updatefunds,
    delete: _delete
};



async function getAll() {
    return await db.Project.findAll();
}

async function getById(id) {
    return await getProject(id);
}

async function create(params) {
   
    params.funds=0;
    
    // save 
    await db.Project.create(params);
}

async function update(id, params) {
    const project = await getProject(id);

    

    // copy params to project and save
    Object.assign(project, params);
    await project.save();

    return omitHash(project.get());
}

async function _delete(id) {
    const project = await getProject(id);
    await project.destroy();
}

// helper functions

async function updatefunds(id, params) {
    const project = await getProject(id);

    console.log(project.funds)
    project.funds=Number(project.funds)+Number(params);
    // copy params to user and save
    Object.assign(project, params);
    await project.save();

    return project.get();
}

async function getProject(id) {
    const project = await db.Project.findByPk(id);
    if (!project) throw 'Project not found';
    return project;
}

async function getUserProject(id) {
    const project = await db.Project.findAll({ where: { id_user : id }});
    if (!project) throw 'Project not found';
    return project;
}

async function invest(amount,userId,projectId) {
    userService.subBalance(userId,amount);
    updatefunds(projectId,amount);
    const his={
        transactionType:"debit",
        amount:amount,
        id_user:userId,
        id_project:projectId,
        date:"12-12-2020"
    };
    historyService.create(his);
}

