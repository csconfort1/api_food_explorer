const AppError = require("../../utils/AppError");
const {hash, compare} = require("bcryptjs");

class UserUpdateService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ id, name, email, new_password, old_password }) {
    if (!name && !email && !new_password && !old_password) {
      throw new AppError("Error.");
    }

    const oldData = await this.userRepository.findById(id);

    if (!oldData) {
      throw new AppError("Este usuário não foi encontrado.");
    }

    let Updated = JSON.parse(JSON.stringify(oldData));

    if (name) {
        Updated.name = name;
    }

    if (email) {
      const MailUse = await this.userRepository.findByEmail(email);

      if (MailUse && MailUse.id !== id) {
        throw new AppError("E-mail em uso.");
      }

      Updated.email = email;
    }

    if (new_password) {
      if (!old_password) {
        throw new AppError("NotFound - Senha antiga.");
      }

      const CheckOldPassword = await compare(
        old_password,
        infosUpdated.password
      );

      if (!CheckOldPasswordt) {
        throw new AppError("Erro - Senha antiga.");
      }

      const newPasswordHashed = await hash(new_password, 8);

      infosUpdated.password = newPasswordHashed;
    }

    await this.userRepository.update(infosUpdated);

    return "Success";
  }
}

module.exports = UserUpdateService;