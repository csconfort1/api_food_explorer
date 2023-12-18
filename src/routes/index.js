const {Router} = require("express");

const userRoutes = require("./users.routes");
const sessionsRoutes = require("./sessions.routes");
const orderRoutes = require("./order.routes");
const mealRoutes = require("./meal.routes");
const ingredientRoutes = require("./ingredients.routes");
const favoriteRoutes = require("./favorites.routes");

const routes = Router();

routes
  .use("/users", userRoutes)
  .use("/sessions", sessionsRoutes)
  .use("/orders", orderRoutes)
  .use("/meals", mealRoutes)
  .use("/ingredients", ingredientRoutes)
  .use("/favorites", favoriteRoutes);
  

module.exports = routes;