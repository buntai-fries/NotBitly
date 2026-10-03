import express from "express";
import path from "path";
import { redirectLink } from "../controllers/linkController.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.sendFile(path.join(process.cwd(), "public", "index.html"));
});

router.get("/about", (req, res) => {
  res.sendFile(path.join(process.cwd(), "public", "about.html"));
});

router.get("/converter", (req, res) => {
  res.sendFile(path.join(process.cwd(), "public", "converter.html"));
});

// The dynamic route must be last so it doesn't hijack /about or /converter
router.get("/:shortID", redirectLink);

export default router;
