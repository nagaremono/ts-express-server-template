import express from 'express';
import helmet from 'helmet';
import responseLogger from './middlewares/responseLogger';

const app = express();

app.use(helmet());
app.use(responseLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/hello', (_, res) => {
  res.send('world');
});

export default app;
