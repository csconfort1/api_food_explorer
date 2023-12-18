class MealShowService {
    constructor(mealRepository, ingredientsRepository) {
      this.mealRepository = mealRepository;
      this.ingredientsRepository = ingredientsRepository;
    }
  
    async execute(id) {
      const meal = await this.mealRepository.findById(id);
  
      const ingredients = await this.ingredientsRepository.showIngredientsOfAMeal(
        id
      );
  
      const mealIngredients = {
        ...meal,
        ingredients,
      };
  
      return mealIngredients;
    }
  }
  
  module.exports = MealShowService;