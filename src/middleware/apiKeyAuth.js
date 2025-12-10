export function apiKeyAuth(req, res, next) {
  const clientKey = req.headers["x-api-key"];

  if (!clientKey) {
    return res.status(401).json({ error: "Missing API key" });
  }

  if (clientKey !== process.env.API_KEY_SECRET) {
    return res.status(403).json({ error: "Invalid API key" });
  }

  next(); // API key is valid - continue to route handler
}
