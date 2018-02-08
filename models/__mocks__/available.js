'use strict'
var SequelizeMock = require('sequelize-mock')
var dbMock = new SequelizeMock()

module.exports = function(sequelize, DataTypes){
  return dbMock.define('Available', {
    loa: 35,
    kind: 'slip',
    location: 'C7 Shelter Island Marina',
    description: "End tie at dock C, the draft is roughly 20 feet. Near the moor is access to the marina and downtown bars."
  })
}
