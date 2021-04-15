import { Router } from 'express';
import { 
  DatabaseError,
  validateRequest
} from '@iagosrm/common';
import { userSerializer } from '../serializers';
import {
  getUser,
  getAllUsers,
  insertUser,
  updateUser,
  deleteUser
} from '../../application/user.use-case';
import { 
  emailValidator,
  passwordValidator,
  usernameValidator
} from '../validators';

const userRouter = Router();

userRouter.get('/', async (_, res, __) => {
  try {
    // TODO: pagination
    // console.log(req.query.limit, req.query.offset); /users?limit=10&offset=5
    const allUsers = await getAllUsers();
    res.status(200).json(allUsers);
  } catch {
    throw new DatabaseError();
  }
});

userRouter.get('/:email', 
  emailValidator('params'),
  validateRequest,
  async (req,res,_) => {

    const requestUser = userSerializer(req.params);

    let user = undefined;
    try {
      user = await getUser(requestUser.email);
    } catch {
      throw new DatabaseError();
    }

    if (!user) throw new DatabaseError('User with that unique identifier not found', 404);
    res.status(200).json({ user });
  }
);

userRouter.post('/', 
  emailValidator(), passwordValidator(), usernameValidator(true),
  validateRequest,
  async (req, res, _) => {
    
    const user = userSerializer(req.body);;
    
    await insertUser(user);

    res.sendStatus(200);
  }
);

// allows to change only password
userRouter.put('/:email', 
  emailValidator('params'), passwordValidator(),
  validateRequest,
  async (req, res, _) => {

    let reqBodyUser = userSerializer(req.body);
    let reqParamsUser = userSerializer(req.params);

    let user = undefined;
    try {
      user = await getUser(reqParamsUser.email);
      // throw new Error();
    } catch {
      throw new DatabaseError('There was a problem to get the user.');
    }
    
    if(user) {
      user.password = reqBodyUser.password;
      try {
        await updateUser({
          email: reqParamsUser.email, 
          password: reqBodyUser.password
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

userRouter.delete('/:email',
  emailValidator('params'),
  validateRequest,
  async (req, res) => {
    const user = userSerializer(req.params);
    
    const result = await deleteUser({
      email: user.email
    });

    if(result) return res.sendStatus(200);
    return res.sendStatus(404);
  }
);

export { userRouter }

