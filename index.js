import fs from "fs";
import express from "express";
import bodyParser from "body-parser";
import { nanoid } from "nanoid";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(express.json());

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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
  const shortLink = "NotBitly.com/" + generateID();
  res.json({
    message: "Conversion Completed.",
    shortLink: shortLink,
    original: longUrl,
  });
});

app.listen(port, () => {
  console.log(`The server ${port} is running!`);
});
