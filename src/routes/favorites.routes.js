const {Router} = require("express");
const FavoritesController = require("../controllers/FavoritesController");
const ensuresMealRegistered = require("../middlewares/ensuresMealRegistered");
const ensureNotAdmin = require("../middlewares/ensureNotAdmin");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const routes = Router();
const favoritesController = new FavoritesController();

routes
  .post("/:meal_id", ensureAuthenticated, ensureNotAdmin, ensuresMealRegistered, favoritesControllers.create)
  .get("/", ensureAuthenticated, favoritesController.index)
  .delete("/:meal_id", ensureAuthenticated, ensureNotAdmin, favoritesControllers.delete);

module.exports = routes;