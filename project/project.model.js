const { DataTypes } = require('sequelize');
const User = require('../users/user.model')
const db = require('../_helpers/db.js')
module.exports = model;

function model(sequelize) {
    const attributes = {
        name: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.STRING, allowNull: false },
        location: { type: DataTypes.STRING, allowNull: false },
        funds: { type: DataTypes.STRING, allowNull: false}
        
    };


    return sequelize.define('Project', attributes);
}