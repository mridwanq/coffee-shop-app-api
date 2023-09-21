const moment = require('moment');
const { Transaction, Sequelize, sequelize } = require('../models');

const reportController = {
  getAllReports: async (req, res) => {
    try {
      const result = await Transaction.findAll();
      res.status(200).json({
        status: 'Success',
        data: result,
      });
    } catch (error) {
      res.status(500).send(error?.message);
    }
  },

  getReportByDate: async (req, res) => {
    try {
      let datefrom;
      let dateto;
      if (req.query.datefrom && req.query.dateto) {
        datefrom = new Date(req.query.datefrom);
        dateto = new Date(req.query.dateto + ' 23:59:59');
      }
      if (req.query.datefrom && !req.query.dateto) {
        datefrom = new Date(req.query.datefrom);
        dateto = new Date(req.query.datefrom + ' 23:59:59');
        dateto = new Date(dateto.setDate(dateto.getDate() + 7));
      }
      if (!req.query.datefrom && req.query.dateto) {
        dateto = new Date(req.query.dateto + ' 23:59:59');
        datefrom = new Date(req.query.dateto);
        datefrom = new Date(datefrom.setDate(datefrom.getDate() - 7));
      }
      if (!req.query.datefrom && !req.query.dateto) {
        dateto = new Date();
        datefrom = new Date();
        datefrom = new Date(new Date().setDate(datefrom.getDate() - 7));
      }

      console.log(dateto, datefrom);

      const result = await Transaction.findAll({
        logging: false,
        limit: 7,
        attributes: [
          [sequelize.fn('SUM', sequelize.col('total')), 'totalByDate'],
          [sequelize.fn('DATE', sequelize.col('createdAt')), 'Date'],
        ],
        group: [sequelize.fn('DATE', sequelize.col('createdAt')), 'Date'],
        where: {
          createdAt: {
            [Sequelize.Op.between]: [datefrom, dateto],
          },
        },
      });

      const date = [];
      const totalByDate = [];
      result.forEach((val) => {
        date.push(val.dataValues.Date);
        totalByDate.push(Number(val.dataValues.totalByDate));
      });

      return res.send({ date: date, totalByDate: totalByDate });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
};

module.exports = reportController;
