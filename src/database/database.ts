import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME || 'crud_user',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || 'mySQL7122023@',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    port: Number(process.env.DB_PORT) || 3306,
  }
);