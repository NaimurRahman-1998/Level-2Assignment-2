import cors from 'cors';
import express from 'express';
import { userRoutes } from './modules/user/user.route';

const app = express();

//express middlewares
app.use(express.json());
app.use(cors());

// api endpoint for user routes
app.use('/api/users', userRoutes);


// response to home page
app.get('/', (req, res) => {
  res.send('welcome to assignment');
});

export default app;
