import fs from "fs";
import express from "express";
import bodyParser from "body-parser";
import { nanoid } from "nanoid";
import { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 5000;
const __dirname = dirname(fileURLToPath(import.meta.url));
const __urlPath = "./URL/url.json";

app.use(bodyParser.urlencoded({ extended: false }));

function generateID() {
  return nanoid(8);
}

// Create encrypted code and Map it to user-prompted link.
function userInput(longURL) {
  const shortId = generateID();
  const urlDataBase = {};
  urlDataBase[shortId] = longURL;
  fs.writeFileSync(__urlPath, JSON.stringify(urlDataBase, null, 2));
  return shortId;
}

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/submit", (req, res) => {
  userInput(req.body["link"]);
  res.sendFile(__dirname + "/public/submit.html");
});

app.listen(port, () => {
  console.log(`The server ${port} is running!`);
});
