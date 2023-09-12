const Controller = require("./baseController");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UserController extends Controller {
  constructor(modelName) {
    super(modelName);
  }

  async createCashierAccount(req, res) {}
  async login(req, res) {
    const { username, password } = req.body;
    try {
      const user = await this.db.findOne({
        where: { username },
        logging: false,
      });
      if (!user) throw new Error("Wrong username or password");
      const isValid = await bcrypt.compare(password, user.dataValues.password);
      if (!isValid) throw new Error("Wrong username or password");
      delete user.dataValues.password;
      const token = jwt.sign(
        {
          id: user.dataValues.id,
          role: user.dataValues.role,
        },
        process.env.jwt_secret,
        { expiresIn: "1h" }
      );
      return res.send({ token: token, user: user.dataValues });
    } catch (err) {
      res.status(400).send(err?.message);
    }
  }
  async keepLogin(req, res) {
    try {
      const { token } = req;
      const data = jwt.verify(token, process.env.jwt_secret);
      const user = await this.db.findByPk(data.id);
      delete user.dataValues.password;
      const newToken = jwt.sign(
        { id: user.dataValues.id, role: user.dataValues.role },
        process.env.jwt_secret,
        { expiresIn: "1h" }
      );
      return res.send({ token: newToken, user: user.dataValues });
    } catch (err) {
      return res.status(500).send(err?.message);
    }
  }
  async getByQuery(req, res) {
    const { username, fullname, email, phone, role, gender } = req.query;
    const { count, rows } = await this.db.findAndCountAll({
      where: {
        ...(typeof role === "string" && { role }),
      },
    });
  }
}

module.exports = new UserController("User");
