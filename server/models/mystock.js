'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MyStock extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MyStock.belongsTo(models.User, {foreignKey: "UserId"})
    }
  }
  MyStock.init({
    ticker: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    buyPrice: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    currentPrice: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    share: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    roe: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: "Users"
        },
        key: "id"
      }
    }
  }, {
    sequelize,
    modelName: 'MyStock',
  });
  return MyStock;
};