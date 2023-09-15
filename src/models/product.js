"use strict";
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
      models.Product.belongsToMany(models.Category, {
        through: models.Product_categories,
        foreignKey: {
          name: "productId",
          primaryKey: true,
          unique: false,
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
      stock: DataTypes.INTEGER,
      category: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
