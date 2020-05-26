'use strict';

module.exports = function (sequelize, DataTypes) {

    let User = sequelize.define('User', {
        id: { autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
        nome: { type: DataTypes.STRING, notEmpty: true },
        apelido: { type: DataTypes.STRING, notEmpty: true },
        username: { type: DataTypes.TEXT },
        tipo: { type: DataTypes.TEXT },
        email: { type: DataTypes.STRING, validate: { isEmail: true } },
        password: { type: DataTypes.STRING, allowNull: false },
        sobre: { type: DataTypes.TEXT },
        last_login: { type: DataTypes.DATE },
        status: { type: DataTypes.ENUM('active', 'inactive'), defaultValue: 'active' }
    },
        {
            timestamps: false
        }
    );

    return User;
}
