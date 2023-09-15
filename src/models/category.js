"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Category.belongsToMany(models.Product, {
        through: models.Product_categories,
        foreignKey: {
          name: "categoryId",
          primaryKey: true,
          unique: false,
        },
      });
    }
  }
  Category.init(
    {
      category_name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Category",
    }
  );
  return Category;
};
