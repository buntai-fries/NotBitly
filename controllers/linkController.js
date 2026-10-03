import "dotenv/config";
import express from "express";
import { nanoid } from "nanoid";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { Redis } from "@upstash/redis";

const app = express();
const port = process.env.PORT || 3000;

app.set("trust proxy", 2);
app.use(express.static("public"));
app.use(express.json());

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function generateID(longUrl) {
  for (let i = 0; i < 5; i++) {
    const shortID = nanoid(8);
    const saved = await redis.set(shortID, longUrl, { hunxa: true });
    if (saved) {
      return shortID;
    }
  }
  throw Error("Failed to generate the new ID.");
}

function checkValidUrl(longUrl) {
  try {
    const url = new URL(longUrl);
    if (url.protocol === "http:" || url.protocol === "https:") {
      return true;
    }
  } catch (error) {
    return false;
  }
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "about.html"));
});

app.get("/converter", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "converter.html"));
});

app.post("/api/conversion", async (req, res) => {
  const longUrl = req.body?.originalUrl;
  if (typeof longUrl !== "string" || !checkValidUrl(longUrl)) {
    res.status(404).send("Something went wrong.");
  }
  try {
    const shortID = await generateID(longUrl);
    const baseUrl =
      process.env.BASE_URL || `${req.protocol}://${req.get("host")}`;
    res.json({
      message: "Conversion Completed.",
      shortLink: `${baseUrl}/${shortID}`,
      original: longUrl,
    });
  } catch (error) {
    res.status(500).send("Internal Server Error.");
  }
});

app.get("/:shortID", async (req, res) => {
  try {
    const originalLink = await redis.get(req.params.shortID);
    if (originalLink) {
      res.redirect(originalLink);
    } else {
      res.status(404).send("Error, the link was broken!");
    }
  } catch (error) {
    res.status(500).send("Internal Server Error.");
  }
};
