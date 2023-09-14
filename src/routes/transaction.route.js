const TransactionController = require("../controllers/transaction.controller");
const {
  validateEditTransactionRule,
  generalValidate,
} = require("../middlewares/validators/transaction.validator");
const {
  cashierValidator,
} = require("../middlewares/validators/user.validator");
const route = require("express").Router();

route.get(
  "/:id",
  cashierValidator,
  TransactionController.getOneWithDetail.bind(TransactionController)
);

route.post(
  "/",
  cashierValidator,
  TransactionController.create.bind(TransactionController)
);
route.patch(
  "/:id",
  validateEditTransactionRule(),
  generalValidate,
  cashierValidator,
  TransactionController.update.bind(TransactionController)
);

module.exports = route;
