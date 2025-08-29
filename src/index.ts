import { drizzle } from 'drizzle-orm/neon-http';

// biome-ignore lint/style/noNonNullAssertion: env exists
const db = drizzle(process.env.DATABASE_URL!);
export default db;
