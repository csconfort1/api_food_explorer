require("dotenv/config");

const AppError = require("../../utils/AppError");
const {hash} = require("bcryptjs");

class UserCreateService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ name, email, password }) {
    const InformationService = name && email && password;

    if (!InformationService) {
      throw new AppError("Preencha todas as informações.");
    }

    const RepeatedEmail = await this.userRepository.findByEmail(email);

    if (RepeatedEmail) {
      throw new AppError("Este e-mail já a ser utilizado.");
    }

    const ValidatedEmail = email
      .split("@")[1]
      .split("")
      .filter(char => char === ".").length;

    const ValidEmail =
        ValidatedEmail === 1 ||
        ValidatedEmail === 2;

    if (!ValidEmail) {
      throw new AppError("E-mail inválido.");
    }

    const passwordHashed = await hash(password, 6);

    const AdminEmail = email.includes(process.env.ADMIN_EMAIL || "admin@email.com");
    const is_admin = AdminEmail ? true : false;

    const userRegistered = await this.userRepository.create({name, email, password: passwordHashed, is_admin,});

    return userRegistered;
  }
}

module.exports = UserCreateService;