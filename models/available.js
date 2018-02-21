'use strict';
module.exports = (sequelize, DataTypes) => {
  var Available = sequelize.define('Availability', {
    loa: DataTypes.INTEGER,
    kind: DataTypes.STRING,
    location: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
  }
  });
  return Available;
};
