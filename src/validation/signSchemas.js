import { z } from "zod";

/**
 * Schema for GET /sign/:key params
 * - key: required S3 object key
 */
export const signParamsSchema = z.object({
  key: z.string().min(1, "key is required"),
});

/**
 * Schema for GET /sign/:key query
 * - expiresIn: optional, coerced to number, clamped to 1-3600 seconds, defaults to 60
 */
export const signQuerySchema = z.object({
  expiresIn: z.coerce
    .number()
    .int("expiresIn must be an integer")
    .min(1, "expiresIn must be at least 1 second")
    .max(3600, "expiresIn must be at most 3600 seconds")
    .default(60),
});
