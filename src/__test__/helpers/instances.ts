import { container, Dependencies } from "../../containers";
import { Application } from "../../app";
import { Database } from "@infrastructure";
import { ITokenUseCase, IUserUseCase } from "@application";

export const baseUrn = `/api/v1/users`;

export const testAppInstance: Application = container.resolve(Dependencies.APP);

export const testDbInstance: Database = container.resolve(Dependencies.DB);

export const tokenUseCase: ITokenUseCase = container.resolve(
  Dependencies.TOKENUSECASE
);

export const userUseCase: IUserUseCase = container.resolve(
  Dependencies.USERUSECASE
);
