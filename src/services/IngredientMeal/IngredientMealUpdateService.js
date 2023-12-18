class IngredientMealUpdateService {
    constructor(IngredientMealRepository) {
      this.IngredientMealRepository = IngredientMealRepository;
    }
  
    async execute({ meal_id, ingredients }) {
      await this.IngredientMealRepository.delete(meal_id);
  
      const ingredientsMeal = ingredients.map(ingredient => {
        return {
          meal_id,
          ingredient_id: ingredient.id,
        };
      });
  
      await this.IngredientMealRepository.create(ingredientsMeal);
    }
  }
  
  module.exports = IngredientMealUpdateService;