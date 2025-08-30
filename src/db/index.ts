import { drizzle } from 'drizzle-orm/neon-http';

const databaseUrl =
  process.env.DRIZZLE_TARGET === 'prod'
    ? process.env.DATABASE_URL
    : process.env.DEV_DATABASE_URL;

// biome-ignore lint/style/noNonNullAssertion: env exists
const db = drizzle(databaseUrl!);
export default db;
