import { Router } from 'express';
import { UserUseCase } from '../../application';
import { IDatabase } from '../../domain/interfaces/database.interface';
import { userSerializer } from '../serializers';

export const getUserRouter = (db: IDatabase) => {

  const {
    getUser,
    getAllUsers,
    insertUser,
    updateUser
  } = UserUseCase(db);
  
  const router = Router();

  router.get('/', async (_, res, next) => {
    const allUsers = await getAllUsers().catch(next);
    res.json({users: allUsers})
  });

  // router.get('/:email', async (req,res,next) => {

  // });

  router.post('/new', async (req, res, next) => {

    let user = undefined;
    try {
      user = userSerializer(req.body);
    } catch {
      req.statusCode = 400;
      return next('E-mail or password not provided')
    }
    
    user ? insertUser(user)
    .then(() => res.sendStatus(200))
    .catch((error: any) => {
      console.log(JSON.stringify(error))
      // this code means that the input value violates unique constraint
      if(error.code === "23505") {
        req.statusCode = 400;
        next('Já existe um cadastro para este endereço de e-mail.')
      } else {
        next(error)
      }
    }) : next('Não foi possível obter o usuário a partir da requisição.');
  });

  // allows to change password and username, but not email
  router.post('/update', async (req, res, next) => {
    let payloadUser = undefined;
    try {
      payloadUser = userSerializer(req.body); 
    } catch {
      req.statusCode = 400;
      return next('E-mail or password not provided')
    }

    const user = await getUser({
      email: payloadUser.email
    }).catch(next);

    if(user) {
      user.password = payloadUser.password;
      user.username = payloadUser.username;
      await updateUser(user).catch(next);
      res.sendStatus(200);
    }
  });

  return router;
}
  