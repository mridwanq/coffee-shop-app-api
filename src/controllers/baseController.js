const db = require("../models");

class Controller {
  constructor(modelname) {
    this.db = db[modelname];
  }

  async create(req, res) {
    await this.db
      .create({
        ...req.body,
        logging: false,
      })
      .then((result) => {
        delete result.dataValues.password;
        return res.send(result.dataValues);
      })
      .catch((err) => res.status(500).send(err?.message));
  }
  async update(req, res) {
    const { id } = req.params;
    console.log(req.body);
    await this.db
      .update({ ...req.body }, { where: { id } })
      .then((result) => res.send(result))
      .catch((err) => res.status(500).send(err?.message));
  }
  async getByID(req, res) {
    const id = req.params;
    await this.db
      .findByPk(id)
      .then((result) => res.send(result))
      .catch((err) => res.status(500).send(err?.message));
  }
  async delete(req, res) {
    const id = req.params;
    await this.db
      .destroy({ where: id })
      .catch((err) => res.status(500).send(err?.message));
  }
}

module.exports = Controller;
