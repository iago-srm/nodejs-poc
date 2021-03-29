import { Router, RequestHandler } from 'express';

export type ExpressController = (
  validators: {[validatorName: string] : RequestHandler},
) => Router