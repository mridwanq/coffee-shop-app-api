const { Op } = require("sequelize");
const db = require("../models");
const Controller = require("./baseController");

class TransactionController extends Controller {
  constructor(modelName) {
    super(modelName);
  }

  newTransaction = async (req, res) => {
    await this.db
      .create({
        ...req.body,
        logging: false,
      })
      .then((result) => {
        global.io?.emit(`NEW_TRANSACTION`, result.dataValues);
        return res.send(result.dataValues);
      })
      .catch((err) => res.status(500).send(err?.message));
  };

  getAll = async (req, res) => {
    // const page = Number(req.query.page);
    // const limit = 2;
    await this.db
      .findAndCountAll({
        // offset: page * limit,
        // limit: limit,
        include: [{ model: db.Transaction_details }],
      })
      .then((result) => res.send(result));
  };

  getOneWithDetail = async (req, res) => {
    const { id } = req.params;
    await this.db
      .findByPk(id, {
        logging: false,
        include: [
          {
            model: db.Transaction_details,
            attributes: [
              "id",
              "transactionId",
              "status",
              "productId",
              "price",
              "qty",
            ],
            include: [
              { model: db.Product, attributes: ["id", "productName", "stock"] },
            ],
          },
          { model: db.Transaction_order_type, attributes: ["order_type"] },
        ],
      })
      .then((result) => res.send(result))
      .catch((err) => res.status(500).send(err?.message));
  };

  getOutStandingTransaction = async (req, res) => {
    await this.db
      .findAndCountAll({
        where: { isPaid: { [Op.notIn]: [1, true] } },
        order: [["createdAt", "desc"]],
        logging: false,
      })
      .then((result) => res.send(result))
      .catch((err) => res.status(500).send(err?.message));
  };

  getOrderType = async (req, res) => {
    try {
      const result = await db.Transaction_order_type.findAll();
      return res.send(result);
    } catch (err) {
      return res.status(500).send(err?.message);
    }
  };
}

module.exports = new TransactionController("Transaction");
