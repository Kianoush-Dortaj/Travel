import * as dotenv from 'dotenv';
dotenv.config();

export const DatabaseConfig={
  url: process.env.DATABASE_URL
}

export default DatabaseConfig;
