import Express from 'express';
const app = Express();
import dotenv from 'dotenv';
import cors from 'cors';
import { database } from './database';
import bodyParser from 'body-parser';
import router from './routes';

dotenv.config();

app.use(
  cors({
    credentials: true,
  }),
);

app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));
app.use(bodyParser.json({ limit: '10mb' }));

app.use('/api/post', router.post);
app.use('/api/phone', router.phone);
app.use('/api/profile', router.profile);

app.get('/', (req, res) => {
  res.send('Hello');
});

app.post('/api', (req, res) => {
  return res.status(200).send();
});

app.listen(process.env.PORT, () => {
  database()
    .then((res) => {
      console.log(`Backend listening on ${process.env.PORT} port!`);
    })
    .catch((err) => {
      console.log(err);
    });
});
