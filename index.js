import fs from "fs";
import express from "express";
import bodyParser from "body-parser";
import { nanoid } from "nanoid";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { Redis } from "@upstash/redis";
import console from "console";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(express.json());

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const urlDatabase = {};
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

function generateID() {
  return nanoid(8);
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

app.post("/api/conversion", (req, res) => {
  const longUrl = req.body.originalUrl;
  const shortID = generateID();
  const shortLink = "https://url-shortner-api-theta.vercel.app/" + shortID;
  urlDatabase[shortID] = longUrl;
  res.json({
    message: "Conversion Completed.",
    shortLink: shortLink,
    original: longUrl,
  });
});

app.get("/:shortID", async (req, res) => {
  try {
    const originalLink = await redis.get(req.params.shortID);
    if (originalLink) {
      return res.redirect(originalLink);
    }
    res.status(404).send("Error, the link was broken!");
  } catch (error) {
    res.status(500).send("An HTTP 500 Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`The server ${port} is running!`);
});
