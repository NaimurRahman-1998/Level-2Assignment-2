import cors from 'cors';
import express from 'express';
import { userRoutes } from './modules/user/user.route';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/users' , userRoutes)

app.get('/', (req, res) => {
  res.send('welcome to assignment');
});

export default app;
