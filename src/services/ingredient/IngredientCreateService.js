const AppError = require("../../utils/AppError");

class IngredientCreateService {
  constructor(ingredientRepository) {
    this.ingredientRepository = ingredientRepository;
  }

  async execute({ name }) {
    const NameInUse = await this.ingredientRepository.findByName(name);

    if (NameInUse) {
      throw new AppError("Nome do ingrediente em uso.");
    }

    const ingredientId = await this.ingredientRepository.create({ name });

    const ingredientInformation = {
      id: ingredientId,
      name,
      image: null,
    };

    return ingredientInformation;
  }
}

module.exports = IngredientCreateService;