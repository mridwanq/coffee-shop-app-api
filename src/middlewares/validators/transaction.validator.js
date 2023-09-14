const { body, validationResult } = require("express-validator");

const validateEditTransactionRule = () => {
  return [
    body("id").isInt({ min: 1 }),
    body("total").isFloat({ gt: 0 }).optional({ nullable: true }),
    body("isPaid").isBoolean().optional({ nullable: true }),
    body("staff").isInt({ min: 1 }),
  ];
};

const validateNewTransactionDetailRule = () => {
  return [
    body("transactionId").isInt({ min: 1 }),
    body("productId").isInt({ min: 1 }),
    body("price").isFloat({ gt: 0 }),
    body("qty").isInt({ min: 0 }),
  ];
};

const validateEditTransactionDetailRule = () => {
  return [
    body("id").isInt({ min: 1 }),
    body("transactionId").isInt({ min: 1 }),
    body("productId").isInt({ min: 1 }),
    body("price").isFloat({ gt: 0 }),
    body("qty").isInt({ min: 0 }),
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
  validateEditTransactionRule,
  validateEditTransactionDetailRule,
  validateNewTransactionDetailRule,
  generalValidate,
};
