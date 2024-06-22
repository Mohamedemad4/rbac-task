import { z } from "zod";
import dotenv from "dotenv";

dotenv.config({ path: process.cwd() + "/.env" });

const schema = z.object({
  PORT: z.string(),
  PG_URL: z.string(),
  ACCESS_TOKEN_EXPIRY: z.string(),
  REFRESH_TOKEN_EXPIRY: z.string(),
  PRIVATE_KEY: z.string(),
  NODE_ENV: z.enum(["prod", "development"]),
});

const parsed = schema.safeParse(process.env);

if (!parsed.success) {
  console.error(
    "❌ Invalid environment variables:",
    JSON.stringify(parsed.error.format(), null, 4),
  );
  process.exit(1);
}

export default parsed.data;
