import { Router, RequestHandler } from 'express';
import { IDatabase } from '../../domain/interfaces/database.interface';

export type ExpressController = (
  db: IDatabase, 
  validators: {[validatorName: string] : RequestHandler},
) => Router