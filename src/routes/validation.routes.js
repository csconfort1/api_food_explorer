const {Router} = require('express');

const ValidationController = require("../controllers/ValidationController");
const validationController = new ValidationController();

const validationRoutes = Router();
validationRoutes.post("/", validationController.create);

module.exports = validationRoutes;