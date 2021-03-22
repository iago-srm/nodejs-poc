import { Router } from 'express';
import { UserUseCase } from '../../application';
import { userSerializer } from '../serializers';
import { ExpressController } from './controller-interface';
import { DatabaseError, RequestValidationError } from '../errors';

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
    emailParamsValidator,
    passwordValidator
  } = validators;

  const router = Router();

  router.get('/', async (_, res, __) => {
    try {
      // TODO: pagination
      // console.log(req.query.limit, req.query.offset); /users?limit=10&offset=5
      const allUsers = await getAllUsers();
      res.json({users: allUsers});
    } catch {
      throw new DatabaseError();
    }
  });

  router.get('/:email', 
    emailParamsValidator,
    async (req,res,_) => {
      const errors: any[] = getErrors(req);
      if (errors.length) {
        throw new RequestValidationError(errors);
      }

      const requestUser = userSerializer(req.params);

      let user = undefined;
      try {
        user = await getUser(requestUser.email);
      } catch {
        throw new DatabaseError();
      }

      if (!user) throw new DatabaseError('User with that unique identifier not found', 404);
      res.json({ user });
    }
  );

  router.post('/new', 
    emailValidator, passwordValidator, usernameValidator,
    async (req, res, _) => {
      const errors: any[] = getErrors(req);
      if (errors.length) {
        throw new RequestValidationError(errors);
      }

      const user = userSerializer(req.body);;
      
      await insertUser(user);

      res.sendStatus(200);
    }
  );

  // allows to change only password
  router.put('/update', 
    emailValidator, passwordValidator,
    async (req, res, _) => {
     const errors: any[] = getErrors(req);
      if (errors.length) {
        throw new RequestValidationError(errors);
      }

      let payloadUser = userSerializer(req.body);

      let user = undefined;
      try {
        user = await getUser(payloadUser.email);
        // throw new Error();
      } catch {
        throw new DatabaseError('There was a problem to get the user.');
      }
      
      if(user) {
        user.password = payloadUser.password;
        try {
          await updateUser({
            email: payloadUser.email, 
            password: payloadUser.password
          });
          res.sendStatus(200);
        }
        catch {
          throw new DatabaseError('There was a problem to update the user.');
        }
      } else {
        throw new DatabaseError('User with that unique identifier not found', 404);
      }
    }
  );

  return router;
}
  