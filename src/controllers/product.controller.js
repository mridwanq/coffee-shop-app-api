const { Sequelize, sequelize, Product } = require('../models');

const productController = {
  getAllProducts: async (req, res) => {
    try {
      const result = await Product.findAll();
      res.status(200).json({
        status: 'success',
        data: result,
      });
    } catch (error) {
      res.status(500).send(error?.message);
    }
  },

  getProductById: async (req, res) => {
    try {
      const result = await Product.findByPk(req.params.id);
      if (!result) throw new Error('Product not found');

      res.status(200).json({
        status: 'success',
        data: result,
      });
    } catch (error) {
      res.status(500).send(error?.message);
    }
  },

  getProductByName: async (req, res) => {
    try {
      const { productName } = req.query;
      const result = await Product.findAll({
        where: {
          productName: {
            [Sequelize.Op.like]: `%${productName}%`,
          },
        },
      });
      if (!result) throw new Error('Product not found');

      res.status(200).json({
        status: 'Success',
        data: result,
      });
    } catch (error) {
      res.status(500).send(error?.message);
    }
  },

  sortByProductNameAsc: async (req, res) => {
    try {
      const result = await Product.findAll({
        where: {},
        order: [['productName', 'ASC']],
      });

      res.status(200).json({
        status: 'Success',
        data: result,
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  sortByProductNameDesc: async (req, res) => {
    try {
      const result = await Product.findAll({
        where: {},
        order: [['productName', 'DESC']],
      });

      res.status(200).json({
        status: 'Success',
        data: result,
      });
    } catch (error) {
      res.status(500).send(error?.message);
    }
  },

  sortByPriceAsc: async (req, res) => {
    try {
      const result = await Product.findAll({
        where: {},
        order: [['price', 'ASC']],
      });

      res.status(200).json({
        status: 'Success',
        data: result,
      });
    } catch (error) {
      res.status(500).send(error?.message);
    }
  },

  sortByPriceDesc: async (req, res) => {
    try {
      const result = await Product.findAll({
        where: {},
        order: [['price', 'DESC']],
      });

      res.status(200).json({
        status: 'Success',
        data: result,
      });
    } catch (error) {
      res.status(500).send(error?.message);
    }
  },

  createProduct: async (req, res) => {
    try {
      req.body.imageName = req.file.filename;
      const result = await Product.create({ ...req.body });

      res.status(200).json({
        status: 'Success',
        data: result,
      });
    } catch (error) {
      res.status(500).send(error?.message);
    }
  },

  editProductById: async (req, res, next) => {
    try {
      const { id } = req.params;
      await Product.update({ ...req.body }, { where: { id } });

      next();
    } catch (error) {
      res.status(500).send(error?.message);
    }
  },

  deleteProductById: async (req, res) => {
    try {
      const result = await Product.destroy({ where: { id: req.params.id } });
      if (!result) throw new Error('Product not found');

      res.status(200).json({ status: 'Success' });
    } catch (error) {
      res.status(500).send(error?.message);
    }
  },
};

module.exports = productController;
