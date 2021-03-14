import { Router } from 'express';
import { UserUseCase } from '../../application';
import { userSerializer } from '../serializers';
import { ExpressController } from './controller-interface';

const errorSerializing = "There was an error serializing the payload.";

export const getUserRouter: ExpressController = (
    db, 
    validators,
    getErrors
  ) => {

  const {
    getUser,
    getAllUsers,
    insertUser,
    updateUser
  } = UserUseCase(db);
  
  const {
    usernameValidator,
    emailValidator,
    passwordValidator
  } = validators;

  const router = Router();

  router.get('/', async (_, res, next) => {
    const allUsers = await getAllUsers().catch(next);
    res.json({users: allUsers})
  });

  router.get('/:email', 
    emailValidator,
    async (req,res,next) => {
      const errors: any[] = getErrors(req);
      if (errors.length) {
        res.status(400);
        return next(errors);
      }
      let user = undefined;
      try {
        user = await getUser(userSerializer(req).email);
      } catch {
        res.status(400);
        return next(errorSerializing)
      }
      res.json({ user });
    }
  );

  router.post('/new', 
    emailValidator, passwordValidator, usernameValidator,
    async (req, res, next) => {
      const errors: any[] = getErrors(req);
      if (errors.length) {
        res.status(400);
        return next(errors);
      }
      let user = undefined;
      try {
        user = userSerializer(req.body);
      } catch {
        res.status(400);
        return next(errorSerializing)
      }
      
      user ? insertUser(user)
      .then(() => res.sendStatus(200))
      .catch((error: any) => {
        console.log(JSON.stringify(error))
        // this code means that the input value violates unique constraint at postgres
        if(error.code === "23505") {
          req.statusCode = 400;
          next("There is already an account linked to that e-mail")
        } else {
          next(error)
        }
      }) : next(errorSerializing);
    }
  );

  // allows to change password and username, but not email
  router.post('/update', 
    emailValidator, passwordValidator, usernameValidator,
    async (req, res, next) => {
     const errors: any[] = getErrors(req);
      if (errors.length) {
        res.status(400);
        return next(errors);
      }

      let payloadUser = undefined;
      try {
        payloadUser = userSerializer(req.body); 
      } catch {
        req.statusCode = 400;
        return next(errorSerializing);
      }

      let user = undefined;
      try {
        user = await getUser(userSerializer(req).email);
      } catch {
        req.statusCode = 400;
        return next(errorSerializing);
      }
      
      if(user) {
        user.password = payloadUser.password;
        user.username = payloadUser.username;
        await updateUser(user).catch(next);
        res.sendStatus(200);
      }
    }
  );

  return router;
}
  