const {Router} = require("express");

const userRoutes = require("./users.routes");
const sessionsRoutes = require("./sessions.routes");
const orderRoutes = require("./order.routes");
const mealRoutes = require("./meal.routes");
const ingredientRoutes = require("./ingredient.routes");
const favoriteRoutes = require("./favorite.routes");

const routes = Router();

routes
  .use("/users", userRoutes)
  .use("/sessions", sessionsRoutes)
  .use("/orders", orderRoutes)
  .use("/meals", mealRoutes)
  .use("/ingredients", ingredientRoutes)
  .use("/favorites", favoriteRoutes);
  

module.exports = routes;