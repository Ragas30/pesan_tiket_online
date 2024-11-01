import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import cookieParser from 'cookie-parser';
import authMiddleware from './middleware/authMiddleware.js';

dotenv.config();
const app = express();
const PORT = process.env.SERVER_PORT || 3000;

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use('/v1/authorizes', authRoutes);
app.use('/v1/users', authMiddleware, userRoutes);

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}).catch(err => {
  console.log('Unable to connect to database ' + err);
});