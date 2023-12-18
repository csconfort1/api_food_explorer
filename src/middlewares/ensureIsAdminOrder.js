const AppError = require("../utils/AppError");
const UserRepository = require("../repositories/user/UserRepository");
const OrderRepository = require("../repositories/order/OrderRepository");

async function ensureIsAdminOrder(request, response, next) {
  const user_id = request.user.id;
  const {order_id} = request.params;
  const userRepository = new UserRepository();
  const orderRepository = new OrderRepository();

  const user = await userRepository.findById(user_id);
  const order = await orderRepository.findById(order_id);

  if (!user || !order) {
    throw new AppError("NotFound.");
  }

  const OrdersUser = user.id === order.user_id;

  if (!user.is_admin && !OrdersUser) {
    throw new AppError("Não autorizado.");
  }

  next();
}

module.exports = ensureIsAdminOrder;