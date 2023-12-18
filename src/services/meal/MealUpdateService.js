const AppError = require("../../utils/AppError");

class MealUpdateService {
  constructor(mealRepository) {
    this.mealRepository = mealRepository;
  }

  async execute({ meal_id, title, description, price, ingredients }) {
    if (!meal_id || !title || !description || !price || !ingredients) {
      throw new AppError("Error.");
    }

    const mealInformation = await this.mealRepository.findById(meal_id);

    if (!mealInformation) {
      throw new AppError("Prato não cadastrado.");
    }

    const NameRegistered = await this.mealRepository.findByTitle(
      title
    );

    if (
        NameRegistered &&
        NameRegistered.id !== mealInfos.id
    ) {
      throw new AppError("Título em uso.");
    }

    if (isNaN(price)) {
      throw new AppError("Preço inválido.");
    }

    const mealUpdated = {
      id: meal_id,
      title,
      description,
      price,
    };

    await this.mealRepository.update(mealUpdated);
  }
}

module.exports = MealUpdateService;