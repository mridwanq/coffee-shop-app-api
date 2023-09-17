"use strict";
const { options } = require("joi");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Product.belongsTo(models.Category, {
        foreignKey: {
          name: "categoryId",
        },
      });
      Product.hasMany(models.Transaction_details, { foreignKey: "productId" });
    }
  }
  Product.init(
    {
      productName: DataTypes.STRING,
      imageName: DataTypes.STRING,
      desc: DataTypes.STRING,
      price: DataTypes.INTEGER,
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { isInt: true, min: 0 },
      },
      category: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product",
      hooks: {
        beforeBulkCreate: (instances, options) => {
          // console.log(`instances before`, instances, `here`);
          if (instances.stock < 0) {
            throw new Error("Stock cannot be below zero");
          }
        },
        afterBulkCreate: (instances, options) => {
          // console.log(`instances after`, instances, `here`);
          if (instances.stock < 0) {
            throw new Error("Stock cannot be below zero");
          }
        },
      },
    }
  );
  return Product;
};
