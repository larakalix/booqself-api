import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  cloverApiUrl: process.env.CLOVER_API_URL,
}));
