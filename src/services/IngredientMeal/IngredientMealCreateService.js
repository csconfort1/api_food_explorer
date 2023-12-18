class IngredientMealCreateService {
    constructor(IngredientMealRepository) {
      this.IngredientMealRepository = IngredientMealRepository;
    }
  
    async execute({ mealId, ingredients }) {
      const ingredientsMeal = ingredients.map(ingredient => {
        return {
          meal_id: mealId,
          ingredient_id: ingredient.id,
        };
      });
  
      await this.IngredientMealRepository.create(ingredientsMeal);
    }
  }
  
  module.exports = IngredientMealCreateService;