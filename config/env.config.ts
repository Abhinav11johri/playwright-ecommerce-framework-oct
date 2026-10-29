import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, `../.env.${process.env.ENV || 'qa'}`) });

export const Config = {
  baseUrl: process.env.BASE_URL || 'https://www.saucedemo.com',
  standardUser: process.env.STANDARD_USER || 'standard_user',
  password: process.env.PASSWORD || 'secret_sauce',
};



