import { Router } from "express";
import productRouter from "./product";
import DatabaseSeeder from "../domains/model/seeder/databaseSeeder";

const indexRoutes = Router();


indexRoutes.get("/seed", DatabaseSeeder);

const Routes = [
    productRouter,
    indexRoutes
];



export default Routes;