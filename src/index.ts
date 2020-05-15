import Express from 'express';
const app = Express();
import cors from 'cors';
import config from './config';
import database from './database';
import bodyParser from 'body-parser';
import router from './routes';

const whitelist = ['http://localhost:8081'];

app.use(
  cors({
    origin: whitelist,
    credentials: true,
  }),
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/phone', [router.phone]);

app.get('/', (req, res) => {
  res.send('Hello');
});

app.post('/api', (req, res) => {
  return res.status(200).send();
});

app.listen(config.PORT, () => {
  database()
    .then((res) => {
      if (res) {
        console.log(`Backend listening on ${config.PORT} port!`);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
