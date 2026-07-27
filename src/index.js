import fs from "fs";
import { nanoid } from "nanoid";
import { input } from "@inquirer/prompts";

// the path to store the website address and it's id.
let FILE_PATH = "./url.json";

Process();

// Take the user prompt and encrypt then store the link in "FILE_PATH".
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
