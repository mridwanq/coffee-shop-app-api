"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product_categories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product_categories.init(
    {},
    {
      sequelize,
      modelName: "Product_categories",
    }
  );
  Product_categories.removeAttribute("id");
  return Product_categories;
};
