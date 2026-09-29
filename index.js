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

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const __urlPath = "./URL/url.json";

function generateID() {
  return nanoid(8);
}

// Create encrypted code and Map it to user-prompted link.
function userInput(longURL) {
  const shortId = generateID();
  const shortLink = "NotBitly.com/" + shortId;
  const urlDataBase = {};
  urlDataBase[shortLink] = longURL;
  fs.writeFileSync(__urlPath, JSON.stringify(urlDataBase, null, 2));
  return shortLink;
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

app.post("/submit", (req, res) => {
  userInput(req.body["link"]);
  res.sendFile(path.join(__dirname, "public", "submit.html"));
});

app.listen(port, () => {
  console.log(`The server ${port} is running!`);
});
