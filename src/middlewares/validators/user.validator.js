const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const db = require("../../models");
const bcrypt = require("bcrypt");

const userBodyValidationRules = () => {
  return [
    body("email")
      .isEmail()
      .withMessage("not an email")
      .optional({ nullable: true }),
    body("password").isLength({ min: 8 }).withMessage("too short"),
    body("username").isLength({ min: 5 }).withMessage("too short"),
    body("fullname").isLength({ min: 3 }).withMessage("too short"),
    body("phone")
      .isMobilePhone()
      .withMessage("not a phoneNumber")
      .optional({ nullable: true }),
    body("role").isNumeric().isLength({ min: 1 }).withMessage("required"),
  ];
};

const newCashierAccountValidator = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      req.body.role = 2;
      req.body.password = await bcrypt.hash(req.body.password, 12);
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

const adminValidator = async (req, res, next) => {
  try {
    const username = req.headers["api-key"];
    const { token } = req;
    const data = jwt.verify(token, process.env.jwt_secret);
    const user = await db.User.findOne({ where: { username }, logging: false });
    if (!user) throw new Error("Your credential does not match");
    if (data.role !== 1 || user.role !== 1)
      throw new Error("Your are not authorized");
    next();
  } catch (err) {
    return res.status(400).send(err?.message);
  }
};
const cashierStatusValidator = (req, res, next) => {
  //check enable disable status
  //check role
};

module.exports = {
  userBodyValidationRules,
  newCashierAccountValidator,
  adminValidator,
};
