const express = require("express");
const Router = express.Router();
Router.use("/shorturl", require('./shorturl'))
Router.use("/users", require('./users'))

module.exports = Router;
