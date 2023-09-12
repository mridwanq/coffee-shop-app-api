const UserController = require("../controllers/user.controller");
const route = require("express").Router();

route.post("/auth", UserController.login.bind(UserController));
route.post("/token", UserController.keepLogin.bind(UserController));
route.post("/new_cashier_acount", UserController.create.bind(UserController));

module.exports = route;
