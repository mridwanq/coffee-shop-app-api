const { Op } = require("sequelize");
const db = require("../models");
const Controller = require("./baseController");

class TransactionController extends Controller {
  constructor(modelName) {
    super(modelName);
  }

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
            include: [{ model: db.Product, attributes: ["productName"] }],
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
}

module.exports = new TransactionController("Transaction");
