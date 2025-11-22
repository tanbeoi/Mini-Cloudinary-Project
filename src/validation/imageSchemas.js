import { z } from "zod";

const ALLOWED_FORMATS = ["jpg", "jpeg", "png", "webp", "avif"];

/**
 * Schema for GET /image/:key query parameters
 * - w: optional width (1-4000 pixels), coerced to number
 * - h: optional height (1-4000 pixels), coerced to number
 * - fmt: optional format, maps "jpg" → "jpeg"
 * - q: optional quality (1-100), coerced to number, defaults to 80
 */
export const imageTransformQuerySchema = z.object({
  w: z.coerce
    .number()
    .int("w must be an integer")
    .min(1, "w must be at least 1")
    .max(4000, "w must be at most 4000")
    .optional(),

  h: z.coerce
    .number()
    .int("h must be an integer")
    .min(1, "h must be at least 1")
    .max(4000, "h must be at most 4000")
    .optional(),

  fmt: z
    .enum(ALLOWED_FORMATS, { message: `fmt must be one of: ${ALLOWED_FORMATS.join(", ")}` })
    .transform((val) => (val === "jpg" ? "jpeg" : val))
    .optional(),

  q: z.coerce
    .number()
    .int("q must be an integer")
    .min(1, "q must be at least 1")
    .max(100, "q must be at most 100")
    .default(80),
});

/**
 * Schema for GET /image/:key route params
 * - key: required S3 object key
 */
export const imageTransformParamsSchema = z.object({
  key: z.string().min(1, "key is required"),
});
