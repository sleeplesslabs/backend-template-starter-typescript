import express from 'express';
import Database from './configs/database';
import { logger } from './helpers/log';
import Routes from './routes';
import dotenv from 'dotenv';
import { MiddlewareMorgan } from './middlewares/morgan';


try {
    dotenv.config();
    Database.sync({force: true});

    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));

    app.use(MiddlewareMorgan);


    app.get("/", (req, res) => {
        res.send('<img style="display: block; margin: auto;" src="https://cdn.epicstream.com/images/ncavvykf/epicstream/a54b9c16f0f9e2de831b32febc169e734e4ded3d-1920x1080.png?rect=0,36,1920,1008&w=1200&h=630&auto=format"/>')
    });

    const port = process.env.PORT;

    app.use("/api", Routes);

    app.use(function (req, res) {
        logger.info("Invalid Request From: " + req.url + " Using HTTP Method: " + req.method)
        res.status(404).send('<img style="display: block; margin: auto;" src="https://cdn.epicstream.com/images/ncavvykf/epicstream/a54b9c16f0f9e2de831b32febc169e734e4ded3d-1920x1080.png?rect=0,36,1920,1008&w=1200&h=630&auto=format"/>');
    });
    
    app.listen(port, () => {
        logger.info("apps running on port " + port);
    });

} catch (error: any) {
    logger.error("failed to running apps, error : " + error.message);
    process.exit(1);
}