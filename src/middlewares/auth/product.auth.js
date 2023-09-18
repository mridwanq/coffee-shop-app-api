const fs = require('fs');
const jwt = require('jsonwebtoken');
const { Product } = require('../../models');

const productAuth = {
  authCreateProduct: (req, res, next) => {
    try {
      jwt.verify(req.token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) throw new Error(err, 401);

        if (decoded?.id !== req.body.userId)
          throw new Error('unauthorized', 401);
      });

      next();
    } catch (error) {
      fs.unlink(req, file.path, (err) => {
        if (err) console.log(err);
      });

      res.status(500).send(error?.message);
    }
  },
};

module.exports = productAuth;
