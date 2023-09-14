const TransactionDetailController = require("../controllers/transactionDetail.controller");
const {
  validateEditTransactionDetailRule,
  generalValidate,
  validateNewTransactionDetailRule,
} = require("../middlewares/validators/transaction.validator");
const {
  cashierValidator,
} = require("../middlewares/validators/user.validator");

const route = require("express").Router();

route.patch(
  "/",
  validateEditTransactionDetailRule(),
  generalValidate,
  cashierValidator,
  TransactionDetailController.update.bind(TransactionDetailController)
);

route.post(
  "/",
  validateNewTransactionDetailRule(),
  generalValidate,
  cashierValidator,
  TransactionDetailController.create.bind(TransactionDetailController)
);

module.exports = route;
