const {Router} = require("express");

const usersRouter = require("./users.routes");
const platesRouter = require("./plates.routes.js");
const ingredientsRouter = require("./ingredients.routes.js");
const validationRouter = require("./validation.routes.js");
const favoritesRouter = require("./favorites.routes.js");

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/plates", platesRouter);
routes.use("/ingredients", ingredientsRouter);
routes.use("/validation", validationRouter);
routes.use("/favorites", favoritesRouter);

module.exports = routes;