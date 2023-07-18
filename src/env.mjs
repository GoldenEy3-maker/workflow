import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    NODE_ENV: z.enum(["development", "test", "production"]),
    ACTIVATE_TOKEN_SECRET: z.string(),
    ACCESS_TOKEN_SECRET: z.string(),
    REFRESH_TOKEN_SECRET: z.string(),
    SMTP_HOST: z.string(),
    SMTP_USER: z.string(),
    SMTP_PASS: z.string(),
    SUPABASE_URL: z.string(),
    SUPABASE_KEY: z.string(),
  },

  client: {
    NEXT_PUBLIC_SUPABASE_STORAGE_AVATARS_URL: z.string(),
  },

  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,

    ACTIVATE_TOKEN_SECRET: process.env.ACTIVATE_TOKEN_SECRET,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,

    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASS: process.env.SMTP_PASS,

    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_KEY: process.env.SUPABASE_KEY,

    NODE_ENV: process.env.NODE_ENV,

    NEXT_PUBLIC_SUPABASE_STORAGE_AVATARS_URL:
      process.env.NEXT_PUBLIC_SUPABASE_STORAGE_AVATARS_URL,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
})
