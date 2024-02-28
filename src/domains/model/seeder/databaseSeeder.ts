import { Request, Response } from 'express';
import { logger } from "../../../helpers/log";
import Database from "../../../configs/database";
import ProductSeeder from './productSeeder';

export default async function DatabaseSeeder(req: Request, res: Response) {
    try {
      await Database.sync();
      
      const productSeeder = new ProductSeeder();
      await productSeeder.run();

      logger.info("success running seeder");
      return res.status(200).send({message: "Berhasil seed data"});

    } catch (error: any) {
        logger.error("error running seeder: " + error);
        process.exit()
    } 
}