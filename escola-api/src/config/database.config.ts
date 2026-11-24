import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  uri: process.env.DATABASE_URI || 'mongodb://localhost:27017/escola_dbn',
  maxPoolSize: parseInt(process.env.DATABASE_MAX_POLL_SIZE || '10', 10),
}));