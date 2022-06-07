import express from 'express';
import router from './router.js';
import * as dotenv from 'dotenv';
import Connection from './db/conn.js'
import cookieParser from 'cookie-parser';
import errorFunc from './middlewares/error-middleware.js';



dotenv.config();
const PORT = process.env.PORT;
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use('/api', router);
app.use(errorFunc);
const start = async () => {
  try {
      await Connection.connectToMongo();
      app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
  } catch (e) {
      console.log(e);
  }
}

start();

