class FavoriteIndexService {
    constructor(favoriteRepository) {
      this.favoriteRepository = favoriteRepository;
    }
  
    async execute(user_id) {
      const favoritesUser = await this.favoriteRepository.index(user_id);
  
      return favoritesUser;
    }
  }
  
  module.exports = FavoriteIndexService;