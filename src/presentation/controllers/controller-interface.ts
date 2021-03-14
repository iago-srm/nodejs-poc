import { Router, RequestHandler, Request } from 'express';
import { IDatabase } from '../../domain/interfaces/database.interface';

export type ExpressController = (
  db: IDatabase, 
  validators: {[validatorName: string] : RequestHandler},
  getValidationErrors: (req: Request) => any
) => Router