const { sequelize } = require("../models");
const Controller = require("./baseController");

class TransactionDetailController extends Controller {
  constructor(modelName) {
    super(modelName);
  }

  createMultiValues = async (req, res) => {
    try {
      const multiValue = req.body;
      const addThisToDB = [];
      await sequelize.transaction(async (t) => {
        for (let item of multiValue) {
          if (item.id && item.qty) {
            //yang punya id (di DB) di update
            await this.db.update(
              { ...item },
              { where: { id: item.id }, logging: false, transaction: t }
            );
          } else if (item.id && item.qty === 0) {
            //yang punya id tapi qty 0 di delete dari DB
            await this.db.destroy({
              where: { id: item.id },
              logging: false,
              transaction: t,
            });
          } else if (!item.id && item.qty) {
            //yang ga punya id di kumpulin
            addThisToDB.push(item);
          }
        }
        await this.db.bulkCreate(addThisToDB, {
          logging: false,
          transaction: t,
        }); //yang ga punya id di push ke DB
      });
      return res.send("successfully update this transaction");
    } catch (err) {
      return res.status(500).send(err?.message);
    }
  };
}

module.exports = new TransactionDetailController("Transaction_details");
