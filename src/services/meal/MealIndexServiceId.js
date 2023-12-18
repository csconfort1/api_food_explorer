const AppError = require("../../utils/AppError");

class MealIndexServiceId {
  constructor(mealRepository) {
    this.mealRepository = mealRepository;
  }

  async execute(meals) {
    const Id = meals.map(order => order.meal_id);

    const foundMeals = await this.mealRepository.findManyByIds(Id);

    const noMealFound = foundMeals.length === 0;

    if (noMealFound) {
      throw new AppError("Prato não encontrado.");
    }

    return foundMeals;
  }
}

module.exports = MealIndexServiceId;
