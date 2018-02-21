'use strict';

var SequelizeMock = require('sequelize-mock');
var dbMock = new SequelizeMock();

module.exports = function (sequelize, DataTypes) {
  return dbMock.define('User', {
    firstname: 'Tood',
    lastname: 'Vanderbilt',
    password: 'Empty',
    email: 'mrtoodVee@gmail.com',
    phone: '1(805)217-2171'
  });
};