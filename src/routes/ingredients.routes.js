const {Router} = require("express");

const IngredientsControllers = require("../controllers/IngredientsController");
const IngredientImageController = require("../controllers/IngredientImageController");

const ensureIsAdmin = require("../middlewares/ensureIsAdmin");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const multer = require("multer");
const uploadConfigs = require("../configs/upload");

const ingredientsControllers = new IngredientsControllers();
const ingredientImageController = new IngredientImageController();

const routes = Router();
const upload = multer(uploadConfigs.MULTER);

routes
  .post("/", ensureAuthenticated, ensureIsAdmin, ingredientsControllers.create)
  .get("/", ingredientsControllers.index)
  .patch("/:ingredient_id", ensureAuthenticated, ensureIsAdmin, upload.single("image"), ingredientImageController.update);

module.exports = routes;