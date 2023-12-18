const UserRepository = require("../../repositories/user/UserRepository");
const UserCreateService = require("./UserCreateService");
const UserUpdateService = require("./UserUpdateService");
const AppError = require("../../utils/AppError");

describe("UserUpdateService", () => {
  let userRepository;
  let userCreateService;
  let userUpdateService;

  beforeEach(() => {
    userRepository = new UserRepository();
    userCreateService = new UserCreateService(userRepository);
    userUpdateService = new UserUpdateService(userRepository);
  });

  it("must update a user success", async () => {
    const userOld = {
      name: "Test",
      email: "test@email.com",
      password: "1234",
    };

    const userRegister = await userCreateService.execute(userOld);

    const userUpdated = {
      id: userRegister.id,
      name: "Test Updated",
      email: "test.updated@email.com",
      old_password: "1234",
      new_password: "5678",
    };

    const result = await userUpdateService.execute(userUpdated);

    expect(result).toEqual("Success");
  });

  it("should return an 'email in use' error", async () => {
    const user1 = {
      name: "Test",
      email: "test@email.com",
      password: "1234",
    };

    await userCreateService.execute(user1);

    const user2 = {
      name: "Test 2",
      email: "test2@email.com",
      password: "5678",
    };

    const userRegistered = await userCreateService.execute(user2);

    const user2Updated = {
      id: userRegistered.id,
      email: "test@email.com",
    };

    await expect(userUpdateService.execute(user2Updated)).rejects.toEqual(
      new AppError("E-mail em uso.")
    );
  });

  it("should return an error of 'old password is wrong'", async () => {
    const oldUser = {
      name: "Test",
      email: "test@email.com",
      password: "1234",
    };

    const userRegistered = await userCreateService.execute(oldUser);

    const userUpdated = {
      id: userRegistered.id,
      old_password: "abcd",
      new_password: "5678",
    };

    await expect(userUpdateService.execute(userUpdated)).rejects.toEqual(
      new AppError("Senha antiga incorreta.")
    );
  });
});