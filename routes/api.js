import express from "express";
import { createShortLink } from "../controllers/linkController.js";

const router = express.Router();

router.post("/conversion", createShortLink);

export default router;
