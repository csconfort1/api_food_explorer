const {Router} = require("express");

const favoritesRoutes = Router();

const FavoritesController = require("../controllers/FavoritesController");

const favoritesController = new FavoritesController();

favoritesRoutes.post("/:id", favoritesController.create);
favoritesRoutes.delete("/:id/:user_id", favoritesController.delete);
favoritesRoutes.get("/:user_id", favoritesController.index);

module.exports = favoritesRoutes;