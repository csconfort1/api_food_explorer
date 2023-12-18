const AppError = require("../utils/AppError");
const MealRepository = require("../repositories/meal/MealRepository");

async function ensuresMealRegistered(request, response, next) {
  const {meal_id} = request.params;
  const mealRepository = new MealRepository();
  const mealInfos = await mealRepository.findById(meal_id);

  if (!mealInfos) {
    throw new AppError("Prato não cadastrado.");
  }

  next();
}

module.exports = ensuresMealRegistered;