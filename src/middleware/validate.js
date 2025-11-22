// src/middleware/validate.js
import { ZodError } from "zod";

/**
 * Middleware factory for Zod schema validation.
 * Validates req[location] (query | body | params) and replaces it with validated/transformed data.
 * Returns 400 if validation fails.
 */
export const validate = (schema, location = "query") => (req, res, next) => {
  try {
    console.log(`\n[VALIDATE] Processing ${location}`);
    console.log(`[VALIDATE] Before - req.${location}:`, req[location]);

    const result = schema.safeParse(req[location]);
    console.log(`[VALIDATE] Parse success:`, result.success);

    if (!result.success) {
      console.log(`[VALIDATE] Validation FAILED - errors:`, result.error.flatten());
      return res.status(400).json({
        error: "Validation failed",
        details: result.error.flatten(),
      });
    }

    console.log(`[VALIDATE] Parsed data:`, result.data);

    // Store validated data on req with a special key
    // req.query → req.validatedQuery
    // req.body → req.validatedBody
    // req.params → req.validatedParams
    const validatedKey = `validated${location.charAt(0).toUpperCase() + location.slice(1)}`;
    req[validatedKey] = result.data;
    console.log(`[VALIDATE] Stored validated data in req.${validatedKey}:`, req[validatedKey]);

    next();
  } catch (err) {
    console.error(`[VALIDATE] Unexpected error:`, err.message);
    next(err);
  }
};
