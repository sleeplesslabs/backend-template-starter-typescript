import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

 const Database = new Sequelize({
  database: process.env.DATABASE_NAME || 'template',
  username: process.env.DATABASE_USERNAME || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'postgres',
  host:    process.env.DATABASE_CONNECTION || '127.0.0.1',
  port: 5432,
  dialect:  'postgres',
  timezone: '+00:00', 
  dialectOptions: {
    DateStrings: 'DATETIME'
  },
  pool: {
    max: 100,
    min: 10,
    acquire: 30000,
    idle: 10000
  },
  logging: false

});


export default Database;

