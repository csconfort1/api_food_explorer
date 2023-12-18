const fs = require("fs");
const path = require("path");
const uploadConfig = require("../configs/upload");

class DiskStorageForPlate {
    async saveFile(file, folder) {
            await fs.promises.rename(
                path.resolve(uploadConfig.TMP_FOLDER_PLATE, file),
                path.resolve(folder, file)
            );
            return file; 
        }

    async deleteFile(file, folder) {
        const filePathPlates = path.resolve(folder, file);

        try {
            await fs.promises.stat(filePathPlates);
        } 
        catch {
        
            return;
        }
        await fs.promises.unlink(filePathPlates);
    }
}

module.exports = DiskStorageForPlate;