const { body, validationResult } = require("express-validator");

const validateNewTransactionRule = () => {
  return [
    body("order_type").isInt({ min: 1 }),
    body("staff").isInt({ min: 1 }),
  ];
};

const validateEditTransactionRule = () => {
  return [
    body("id").isInt({ min: 1 }),
    body("total").isFloat({ gt: 0 }).optional({ nullable: true }),
    body("order_type").isInt({ min: 1 }),
    body("isPaid").isBoolean().optional({ nullable: true }),
    body("staff").isInt({ min: 1 }),
  ];
};

const validateMultiValueTransactionDetailRule = () => {
  return [
    body().isArray().withMessage("not an array"),
    body("*.transactionId").isInt({ min: 1 }),
    body("*.productId").isInt({ min: 1 }),
    body("*.price").isFloat({ gt: 0 }),
    body("*.qty").isInt({ min: 0 }),
    body("*.status").isInt({ min: 1 }),
  ];
};

const validateNewTransactionDetailRule = () => {
  return [
    body("transactionId").isInt({ min: 1 }),
    body("productId").isInt({ min: 1 }),
    body("price").isFloat({ gt: 0 }),
    body("qty").isInt({ min: 0 }),
    body("status").isInt({ min: 1 }),
  ];
};

const validateEditTransactionDetailRule = () => {
  return [
    body("id").isInt({ min: 1 }),
    body("transactionId").isInt({ min: 1 }),
    body("productId").isInt({ min: 1 }),
    body("price").isFloat({ gt: 0 }),
    body("qty").isInt({ min: 0 }),
    body("status").isInt({ min: 1 }),
  ];
};

const generalValidate = (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const errorContainer = [];
    errors.array().map((err) => {
      errorContainer.push({ [err.path]: err.msg });
    });
    return res.status(406).json({ errors: errorContainer });
  } catch (err) {
    return res.status(400).send(err?.message);
  }
};

module.exports = {
  validateNewTransactionRule,
  validateEditTransactionRule,
  validateEditTransactionDetailRule,
  validateNewTransactionDetailRule,
  validateMultiValueTransactionDetailRule,
  generalValidate,
};
