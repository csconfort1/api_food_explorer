const { Router } = require("express");

const OrdersControllers = require("../controllers/OrdersControllers");

const ensureNotAdmin = require("../middlewares/ensureNotAdmin");
const ensureIsAdmin = require("../middlewares/ensureIsAdmin");
const ensureIsAdminOrder = require("../middlewares/ensureIsAdminOrder");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const routes = Router();
const ordersControllers = new OrdersControllers();

routes
  .post("/", ensureAuthenticated, ensureNotAdmin, ordersControllers.create)
  .get("/:order_id", ensureAuthenticated, ensureIsAdminOrder, ordersControllers.show)
  .get("/", ensureAuthenticated, ordersControllers.index)
  .put("/", ensureAuthenticated, ensureIsAdmin, ordersControllers.update);

module.exports = routes;