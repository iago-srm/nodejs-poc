import { getMockUser } from "../helpers/data";
import { IUserUseCase, usersTableName } from "@application";
import { User } from "@domain";
import {
  normalizeJsonArray,
  normalizeJson,
  insertUser as insertTestUser, // TODO: faltou o getTestUser
  userUseCase,
  getUser,
} from "../helpers";

describe("UserUseCase.insertUser", () => {
  const { insertUser } = userUseCase;
  const user = getMockUser();

  it("Should modify a user's password before saving to database.", async () => {
    await insertUser(user);
    const retrievedUser = await getUser(user.email);
    if (retrievedUser) {
      const { password: hashedPassword } = retrievedUser;
      expect(hashedPassword).not.toEqual(user.password);
    } else {
      fail("Could not find user");
    }
  });

  it("Should save the rest of user as is.", async () => {
    await insertUser(user);
    const retrievedUser = await getUser(user.email);
    if (retrievedUser) {
      const {
        password: hashedPassword,
        createdAt,
        updatedAt,
        id,
        ...ru
      } = retrievedUser;
      const { password, ...u } = user;
      expect(ru).toStrictEqual(u);
    } else {
      fail("Could not find user");
    }
  });

  it("Should not allow duplicate emails to be saved.", async () => {
    await insertUser(user);
    try {
      await insertUser(user);
      fail("Inserted successfully");
    } catch (e) {
      // TODO: once you find a way to intl error messages, check for correct message in the error
      expect(true).toBe(true);
    }
  });
});

describe("UserUseCase.getUserByEmailAndPassword", () => {
  const user = getMockUser();
  const { getUserByEmailAndPassword, getUserById } = userUseCase;

  it("Should fetch the correct user from database using Email and Password.", async () => {
    await insertTestUser(user);

    const newUser = new User();
    newUser.email = user.email;
    newUser.password = user.password;

    const retrievedUser = await getUserByEmailAndPassword(newUser);

    if (retrievedUser) {
      const { email } = retrievedUser;
      expect(email).toStrictEqual(newUser.email);
    }
  });

  it("Should fetch the correct user from database using ID.", async () => {
    await insertTestUser(user);

    const newUser = new User();
    newUser.email = user.email;
    newUser.password = user.password;

    const retrievedUser = await getUserById(newUser);

    if (retrievedUser) {
      const { email } = retrievedUser;
      expect(email).toStrictEqual(newUser.email);
    }
  });
});
