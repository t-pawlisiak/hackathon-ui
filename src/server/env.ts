import { z } from "zod";

type Env = z.infer<typeof Env>

const Env = z.object({
  DB_HOST: z.string(),
  DB_PORT: z.string(),
  DB_DB: z.string(),
  DB_USER: z.string(),
  DB_PASS: z.string(),

  OPENAI_SECRET: z.string(),
})

export const env = Env.parse(process.env);

console.log(env);
