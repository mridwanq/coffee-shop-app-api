const { Transaction } = require('../models');

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

  getReportByDay: async (req, res) => {
    try {
      const { createdAt } = req.body;
      const result = await Transaction.findOne({ createdAt });
      if (!result) throw new Error('Report not found');

      res.status(200).json({
        status: 'Success',
        data: result,
      });
    } catch (error) {
      res.status(500).send(error?.message);
    }
  },
};

module.exports = reportController;
