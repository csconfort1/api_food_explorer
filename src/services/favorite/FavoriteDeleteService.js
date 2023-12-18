const AppError = require("../../utils/AppError");

class FavoriteDeleteService {
  constructor(favoriteRepository) {
    this.favoriteRepository = favoriteRepository;
  }

  async execute({ user_id, meal_id }) {
    const favoriteInformation = await this.favoriteRepository.findByUserAndMeal({
      user_id,
      meal_id,
    });

    if (!favoriteInformation) {
      throw new AppError("Favorito não encontrado.");
    }

    await this.favoriteRepository.delete(favoriteInformation.id);
  }
}

module.exports = FavoriteDeleteService;