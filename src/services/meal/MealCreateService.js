const AppError = require("../../utils/AppError");

class MealCreateService {
  constructor(mealRepository) {
    this.mealRepository = mealRepository;
  }

  async execute({ title, category, description, price }) {
    if (!title || !category || !description || !price) {
      throw new AppError("Sem dados suficientes para o cadastro de um novo prato.");
    }

    const NameRegistered = await this.mealRepository.findByTitle(
      title
    );

    if (NameRegistered) {
      throw new AppError("Título em uso.");
    }

    if (isNaN(price)) {
      throw new AppError("O preço inválido.");
    }

    const mealId = await this.mealRepository.create({
      title,
      category,
      description,
      price,
    });

    return mealId;
  }
}

module.exports = MealCreateService;