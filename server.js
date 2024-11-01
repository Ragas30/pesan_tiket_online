import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './config/db.js';
import userRoutes from './routes/authRoutes.js';

dotenv.config();
const app = express();
const PORT = process.env.SERVER_PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/v1/authorizes', userRoutes);
app.use('/', (req, res) => {
  res.status(200).send('<h1>Hello World</h1>');
});


sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}).catch(err => {
  console.log('Unable to connect to database ' + err);
});