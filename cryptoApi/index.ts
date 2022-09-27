import express, { Express } from 'express';
import dotenv from 'dotenv';
import sequelize from './db';
import bodyParser from 'body-parser';
import router from "./router";
import MarketService from "./service/market-service";



dotenv.config();

const port = process.env.PORT;

const app: Express = express();
app.use(bodyParser.json());
app.use('/', router);



const start = async (): Promise<void> => {
  try {
      app.listen(port, () => {
        console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
      });
      MarketService.updateData();
  } catch (e) {
      console.log(e)
  }
}
start();


