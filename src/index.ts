import Express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import database from './database';
import constantRoutes from './routes/constantRoutes';
import api from './routes';
import exceptionRoutes from './routes/exceptionRoutes';
import * as logger from './utils/logger';
import setLanguage from './middlewares/setLanguage';

const app = Express();
dotenv.config();

app.use(
  cors({
    credentials: true,
  }),
);

app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));
app.use(bodyParser.json({ limit: '10mb' }));

app.use(constantRoutes.API, setLanguage);
app.use(constantRoutes.API, exceptionRoutes);
app.use(constantRoutes.API, api);

app.listen(process.env.PORT, async () => {
  try {
    await database();
  } catch (error) {
    logger.error(error);
  }
});
