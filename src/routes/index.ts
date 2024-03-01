import { Router } from "express";
import productRouter from "./product";
import DatabaseSeeder from "../domains/model/seeder/databaseSeeder";
import authRouter from "./auth";

const indexRoutes = Router();


indexRoutes.get("/seed", DatabaseSeeder);

const Routes = [
    authRouter,
    productRouter,
    indexRoutes
];



export default Routes;