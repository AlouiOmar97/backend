const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');

module.exports = {
    
    getAll,
    getById,
    create,
    update,
    getUserHistory,
    delete: _delete
};



async function getAll() {
    return await db.History.findAll({
        include: [
            { model: db.Project },
            { model: db.User }
        
        ]
      });
}

async function getById(id) {
    return await getHistory(id);
}

async function create(params) {
   

    
    // save 
    await db.History.create(params);
}

async function update(id, params) {
    const history = await getHistory(id);

    

    // copy params to history and save
    Object.assign(history, params);
    await history.save();

    return omitHash(history.get());
}

async function _delete(id) {
    const history = await getHistory(id);
    await history.destroy();
}

// helper functions

async function getHistory(id) {
    const history = await db.History.findByPk(id);
    if (!history) throw 'History not found';
    return history;
}

async function getUserHistory(id) {
    const history = await db.History.findAll({
        include: [
            { model: db.Project }
          
          ],
        where: {
            id_user: id
        },
        
      });
    if (!history) throw 'History not found';
    return history;
}

