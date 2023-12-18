const AppError = require("../../utils/AppError");

class FavoriteCreateService {
  constructor(favoriteRepository) {
    this.favoriteRepository = favoriteRepository;
  }

  async execute({ user_id, meal_id }) {
    const favoriteyRegistered =
      await this.favoriteRepository.findByUserAndMeal({ user_id, meal_id });

    if (favoriteRegistered) {
      throw new AppError("Favorito já adicionado.");
    }

    await this.favoriteRepository.create({ user_id, meal_id });
  }
}

module.exports = FavoriteCreateService;