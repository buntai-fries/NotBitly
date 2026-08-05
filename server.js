const express = require("express");
const path = require("path");
const fs = require("fs");
const { nanoid } = require("nanoid");

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json()); // parses incoming JSON requests into req.body

// Serve static files (HTML and frontend JS) from "public" folder
app.use(express.static(path.join(__dirname, "public")));

const DATA_FILE = path.join(__dirname, "urls.json");

// Helper: load current mappings from JSON file
function loadUrls() {
  try {
    const raw = fs.readFileSync(DATA_FILE, "utf8"); // read file from disk
    return JSON.parse(raw); // parse JSON into JS object
  } catch (err) {
    return {}; // if file doesn't exist or is invalid, start empty
  }
}

// Helper: save mappings to JSON file
function saveUrls(obj) {
  const data = JSON.stringify(obj, null, 2); // convert object to JSON string
  fs.writeFileSync(DATA_FILE, data, "utf8"); // write to file synchronously
}

// POST /api/shorten – create a short code
app.post("/api/shorten", (req, res) => {
  const { url } = req.body;

  if (!url || typeof url !== "string") {
    return res.status(400).json({ error: "url is required" });
  }

  const urls = loadUrls();

  // Generate a short code – you can keep it shorter if you want
  const code = nanoid(6);

  // Store mapping
  urls[code] = url;
  saveUrls(urls);

  // Return the short URL to the client
  const shortUrl = `${req.protocol}://${req.get("host")}/u/${code}`;
  res.json({ shortUrl, code });
});

// GET /u/:code – redirect to original URL
app.get("/u/:code", (req, res) => {
  const { code } = req.params;
  const urls = loadUrls();

  const original = urls[code];
  if (!original) {
    return res.status(404).send("Unknown short URL");
  }

  res.redirect(original);
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

/*
import fs from "fs";
import { nanoid } from "nanoid";
import { input } from "@inquirer/prompts";
import express from "express";

const app = express();
const port = 5000;

// the path that store the website address and it's id.
let FILE_PATH = "./URL/url.json";

// Take the user prompt and call another function.
async function Process() {
  let userLink = await input({
    message: "Enter the url: ",
  });

  UserInput(userLink);
}

// Generate the id.
function GenerateID() {
  return nanoid(8);
}

// Encrypt, Map and Store the user-prompted link.
function UserInput(longURL) {
  const shortId = GenerateID();
  const urlDataBase = {};
  urlDataBase[shortId] = longURL;
  fs.writeFileSync(FILE_PATH, JSON.stringify(urlDataBase, null, 2));
  return shortId;
}

app.get("/", (req, res) => {
  res.send("Hello, World");
});

app.put("/Core", (req, res) => {
  res.send(Process());
});

app.listen(port, () => {
  console.log(`The server ${port} is up.`);
});
*/
