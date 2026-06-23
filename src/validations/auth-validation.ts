import { z } from "zod";

export const loginSchema = z.object({
  validation: z.string().min(1, "Username atau Email tidak boleh kosong!"),
  password: z.string().min(6, "Password minimal harus 6 karakter!"),
});

export type LoginForm = z.infer<typeof loginSchema>;
