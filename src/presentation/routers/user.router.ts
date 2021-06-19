import { Router } from "express";
import {
  DatabaseError,
  validateRequest,
  BadRequestError,
} from "@iagosrm/common";
import {
  userSerializer,
  getEmailValidator,
  getPasswordValidator,
  getUsernameValidator,
  getRoleValidator,
  getConfirmPasswordValidator,
} from "@presentation";
import { IUserUseCase, ITokenUseCase } from "@application";
import { User } from "@domain";

const usernameRequired = false;

export const makeUserRouter = (
  tokenUseCase: ITokenUseCase,
  userUseCase: IUserUseCase
) => {
  const { getAllUsers, insertUser } = userUseCase;
  const { attachRefreshToken, getTokens } = tokenUseCase;

  const userRouter = Router();

  // make this admin-only
  userRouter.get("/", async (_, res, __) => {
    try {
      // TODO: pagination
      // console.log(req.query.limit, req.query.offset); /users?limit=10&offset=5
      const allUsers = await getAllUsers();
      res.status(200).json(allUsers);
    } catch {
      throw new DatabaseError();
    }
  });

  // // get user with id
  // userRouter.get("/:id", validateRequest, async (req, res, _) => {
  //   const requestUser = userSerializer(req.params);
  //   let user: User | undefined = undefined;
  //   try {
  //     user = await getUserById(requestUser.id.toString());
  //   } catch {
  //     throw new DatabaseError();
  //   }

  //   if (!user)
  //     throw new BadRequestError(
  //       "User with that unique identifier not found",
  //       404
  //     );
  //   const { password, ...rest } = user;
  //   res.status(200).json({ ...rest });
  // });

  // sign up
  userRouter.post(
    "/",
    getEmailValidator(),
    getPasswordValidator(),
    getConfirmPasswordValidator(),
    getUsernameValidator(usernameRequired),
    getRoleValidator(),
    validateRequest,
    async (req, res, _) => {
      // if (req.body.password !== req.body.confirmPassword) {
      //   throw new BadRequestError(
      //     "Password and Confirm Password don't match.",
      //     400
      //   );
      // }

      const user = userSerializer(req.body);

      try {
        await insertUser(user);
      } catch (e) {
        throw new DatabaseError(e.message);
      }

      const { accessToken, refreshToken } = getTokens(user);

      attachRefreshToken(res, refreshToken);
      res.send(accessToken);
    }
  );

  // Change password
  // userRouter.put(
  //   "/:id",
  //   getConfirmPasswordValidator(),
  //   getPasswordValidator(),
  //   validateRequest,
  //   async (req, res, _) => {
  //     let reqBodyUser = userSerializer(req.body);
  //     let reqParamsUser = userSerializer(req.params);

  //     if (req.body.password !== req.body.confirmPassword) {
  //       throw new BadRequestError(
  //         "Password and Confirm Password don't match.",
  //         418
  //       );
  //     }

  //     const refreshToken = req.cookies.isid;

  //     let user: User | undefined = undefined;
  //     try {
  //       user = await getUser(reqParamsUser.id.toString());
  //       // throw new Error();
  //     } catch {
  //       throw new DatabaseError("There was a problem to get the user.");
  //     }

  //     if (user) {
  //       (user as User).password = reqBodyUser.password;
  //       try {
  //         await updateUser({
  //           id: reqParamsUser.id.toString(),
  //           password: reqBodyUser.password,
  //         });
  //         res.sendStatus(200);
  //       } catch {
  //         throw new DatabaseError("There was a problem to update the user.");
  //       }
  //     } else {
  //       throw new DatabaseError(
  //         "User with that unique identifier not found",
  //         404
  //       );
  //     }
  //   }
  // );

  return userRouter;
};
