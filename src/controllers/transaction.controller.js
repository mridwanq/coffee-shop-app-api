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
        // logging: false,
        include: [
          {
            model: db.Transaction_details,
            attributes: ["productId", "price", "qty"],
            include: [{ model: db.Product, attributes: ["productName"] }],
          },
        ],
      })
      .then((result) => res.send(result))
      .catch((err) => res.status(500).send(err?.message));
  };
}

module.exports = new TransactionController("Transaction");
