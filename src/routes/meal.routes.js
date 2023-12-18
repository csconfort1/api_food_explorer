const { Router } = require("express");

const MealsControllers = require("../controllers/MealsController");
const MealImageController = require("../controllers/MealImageController");

const ensureIsAdmin = require("../middlewares/ensureIsAdmin");
const ensuresMealRegistered = require("../middlewares/ensuresMealRegistered");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const multer = require("multer");
const uploadConfigs = require("../configs/upload");

const mealsControllers = new MealsControllers();
const mealImageController = new MealImageController();

const routes = Router();
const upload = multer(uploadConfigs.MULTER);

routes
  .post("/", ensureAuthenticated, ensureIsAdmin, mealsControllers.create)
  .get("/", mealsControllers.index)
  .get("/:meal_id", ensuresMealRegistered, mealsControllers.show)
  .put("/:meal_id", ensureAuthenticated, ensureIsAdmin, ensuresMealRegistered, mealsControllers.update)
  .patch("/:meal_id", ensureAuthenticated, ensureIsAdmin, ensuresMealRegistered, upload.single("image"), mealImageController.update)
  .delete("/:meal_id", ensureAuthenticated, ensureIsAdmin, ensuresMealRegistered, mealsControllers.delete);

module.exports = routes;