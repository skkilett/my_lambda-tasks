import express, { Express } from 'express';
import dotenv from 'dotenv';
import { LinkController } from './controller';
import 'reflect-metadata';
import sequelize from './db';
import bodyParser from 'body-parser';
import httpContext from 'express-http-context';
import { useExpressServer } from 'routing-controllers';

dotenv.config();

const port = process.env.PORT;

const app: Express = express();
app.use(bodyParser.json());
app.use(httpContext.middleware);
useExpressServer(app, {
  controllers: [LinkController]
});

const start = async (): Promise<void> => {
  try {
      await sequelize.authenticate()
      await sequelize.sync()
      app.listen(port, () => {
        console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
      });
  } catch (e) {
      console.log(e)
  }
}
start();


