import { Redis } from 'ioredis';

import { env } from '@/env';

const LOCAL_REDIS_URL = env.REDIS_URL;
const globalForRedis = globalThis as unknown as { redis: Redis };

export const redis = globalForRedis.redis ?? new Redis(LOCAL_REDIS_URL);

if (process.env.NODE_ENV !== 'production') globalForRedis.redis = redis;
