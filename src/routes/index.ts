import { Router } from "express";
import productRouter from "./product";
import DatabaseSeeder from "../domains/model/seeder/databaseSeeder";
import authRouter from "./auth";

declare global {
  namespace Express {
    interface Request {
      authId: string;
      jti: string;
    }
  }
}

const indexRoutes = Router();

indexRoutes.get("/seed", DatabaseSeeder);

const Routes = [
    authRouter,
    productRouter,
    indexRoutes
];



export default Routes;