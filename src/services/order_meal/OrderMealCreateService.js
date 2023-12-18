class OrderMealCreateService {
    constructor(orderMealRepository) {
      this.orderMealRepository = orderMealRepository;
    }
  
    async execute({ orderId, meals_sent }) {
      const orderMeals = meals_sent.map(meal => {
        return {
          order_id: orderId,
          meal_id: meal.meal_id,
          meal_amount: meal.amount,
        };
      });
  
      await this.orderMealRepository.create(orderMeals);
    }
  }
  
  module.exports = OrderMealCreateService;