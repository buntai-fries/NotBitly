import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { redirectLink } from "../controllers/linkController.js";

const router = express.Router();

// Setup __dirname for ES Modules to point to the root folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, "..");

router.get("/", (req, res) => {
  res.sendFile(path.join(rootDir, "public", "index.html"));
});

router.get("/about", (req, res) => {
  res.sendFile(path.join(rootDir, "public", "about.html"));
});

router.get("/converter", (req, res) => {
  res.sendFile(path.join(rootDir, "public", "converter.html"));
});

// The dynamic route must be last so it doesn't hijack /about or /converter
router.get("/:shortID", redirectLink);

export default router;
