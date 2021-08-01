import express from 'express';
import helmet from 'helmet';

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/hello', (_, res) => {
  res.send('world');
});

export default app;
