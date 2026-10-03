import "dotenv/config";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

// Import the route files
import apiRoutes from "./routes/api.js";
import indexRoutes from "./routes/index.js";

const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("trust proxy", 2);
app.use(express.static(path.join(process.cwd(), "public")));
app.use(express.json());

// This wire up the routes
app.use("/api", apiRoutes);
app.use("/", indexRoutes);

// Vercel serverless functions handle the server startup automatically.
// We only listen locally if we aren't in Vercel's production environment.
if (process.env.NODE_ENV !== "production") {
  app.listen(port, () => {
    console.log(`The server ${port} is running!`);
  });
}

// Critical for Vercel
export default app;
