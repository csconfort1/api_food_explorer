const UserCreateService = require("./UserCreateService");
const UserRepository = require("../../repositories/user/UserRepository");
const AppError = require("../../utils/AppError");

describe("UserCreateService", () => {
  let userRepository;
  let userCreateService;

  beforeEach(() => {
    userRepository = new UserRepository();
    userCreateService = new UserCreateService(userRepository);
  });

  it("register user", async () => {
    const user = {
      name: "test",
      email: "test@email.com",
      password: "1234",
    };

    const result = await userCreateService.execute(user);

    expect(result).toHaveProperty("id");
  });

  it("register admin", async () => {
    const admin = {
      name: "test",
      email: `test${process.env.ADMIN_EMAIL || "@admin.com"}`,
      password: "1234",
    };

    const result = await userCreateService.execute(admin);

    expect(result).toHaveProperty("id");
  });

  it("return data error", async () => {
    const user = {
      name: "test",
      email: "",
      password: "1234",
    };

    await expect(userCreateService.execute(user)).rejects.toEqual(
      new AppError("Preencha todas as informações.")
    );
  });

  it("email in use", async () => {
    const user = {
      name: "test",
      email: "test@email.com",
      password: "1234",
    };

    const user2 = {
      name: "test 2",
      email: "test@email.com",
      password: "5678",
    };

    await userCreateService.execute(user);

    await expect(userCreateService.execute(user2)).rejects.toEqual(
      new AppError("E-mail em uso.")
    );
  });

  it("invalid email", async () => {
    const user = {
      name: "test",
      email: "test@email",
      password: "1234",
    };

    await expect(userCreateService.execute(user)).rejects.toEqual(
      new AppError("E-mail inválido.")
    );
  });
});