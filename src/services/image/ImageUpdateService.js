const DiskStorageForPlate = require("../../providers/DiskStorageForPlate");
const AppError = require("../../utils/AppError");

class ImageUpdateService {
  constructor(repository) {
    this.repository = repository;
  }

  async execute({ id, imageFilename, folder }) {
    const infos = await this.repository.findById(id);

    if (!infos) {
      throw new AppError("Não foi possível atualizar prato/ingrediente.");
    }

    const diskStorage = new DiskStorageForPlate();

    if (infos.image) {
      await diskStorage.deleteFile(infos.image, folder);
    }

    const filename = await diskStorage.saveFile(imageFilename, folder);

    const infosUpdated = { id, image: filename };

    await this.repository.updateImage(infosUpdated);

    return infosUpdated;
  }
}

module.exports = ImageUpdateService;