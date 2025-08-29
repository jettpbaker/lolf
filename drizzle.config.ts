import { defineConfig } from 'drizzle-kit';

const isProd = process.env.DRIZZLE_TARGET === 'prod';
const url = isProd
  ? process.env.PROD_DATABASE_URL
  : process.env.DEV_DATABASE_URL;

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema',
  dialect: 'postgresql',
  dbCredentials: {
    // biome-ignore lint/style/noNonNullAssertion: env exists
    url: url!,
  },
});
