const { DataTypes } = require('sequelize');
const User = require('../users/user.model')
const db = require('../_helpers/db.js')
module.exports = model;

function model(sequelize) {
    const attributes = {
        transactionType: { type: DataTypes.STRING, allowNull: false },
        amount: { type: DataTypes.STRING, allowNull: false },
        date: { type: DataTypes.STRING, allowNull: false },
        id_user: { type: DataTypes.INTEGER, allowNull: false},
        id_project: { type: DataTypes.INTEGER, allowNull: true}

        
    };

    /* db.User.hasMany(History,{ foreignKey: 'id_user'})
    db.model.belongsTo(User,{ foreignKey: 'id_user'}) */

    return sequelize.define('History', attributes);
}