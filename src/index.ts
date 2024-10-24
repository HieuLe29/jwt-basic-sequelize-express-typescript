import express from 'express';
import dotenv from 'dotenv';
import { sequelize } from './database/database';
import userRoutes from './routes/user.routes';
import blogRoutes from './routes/blog.routes';

dotenv.config();

const app = express();

const post = process.env.POST || 3000;

// Middleware
app.use(express.json());
// Routes
app.use('/', userRoutes);
app.use('/blogs', blogRoutes);
 

const syncDatabase = async () => {
  try {
    await sequelize.sync(); // Chỉ tạo bảng nếu chưa tồn tại
    console.log('Database synced');
  } catch (err) {
    console.error('Error syncing database:', err);
  }
};

syncDatabase();

// Start the server
app.listen(post, () => {
  console.log(`Server is running on port ${post}`);
});