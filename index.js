import fs from "fs";
import express from "express";
import bodyParser from "body-parser";
import { nanoid } from "nanoid";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
const __urlPath = "./URL/url.json";

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
  res.render("index.ejs");
});

app.get("/about", (req, res) => {
  res.render("about.ejs");
});

app.get("/converter", (req, res) => {
  res.render("converter.ejs");
});

app.post("/submit", (req, res) => {
  userInput(req.body["link"]);
  res.render("submit.ejs");
});

app.listen(port, () => {
  console.log(`The server ${port} is running!`);
});
