const Controller = require("./baseController");

class TransactionDetailController extends Controller {
  constructor(modelName) {
    super(modelName);
  }
}

module.exports = new TransactionDetailController("Transaction_details");
