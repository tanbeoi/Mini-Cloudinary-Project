import app from "./app.js";

// Use Port defined in .env or 3000 as default
const PORT = process.env.PORT || 3000;


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));