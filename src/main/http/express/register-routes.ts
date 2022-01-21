import { Application } from "express";

export const registerExpressRoutes = (app: Application, controller) => {
    app[controller.method](controller.path, controller.controller);
}