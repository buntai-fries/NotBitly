# URL Shortener API

A CLI-based URL shortener prototype inspired by Bitly. It takes a long URL from the user, generates a short, secure identifier, and saves the mapping locally to your machine.

## Tech Stack

- **Runtime:** Node.js
- **Dependencies:**
  - `inquirer`: For interactive command-line prompts.
  - `nanoid`: For generating short, secure, and unique IDs.

## 📂 Folder Structure

```text
RootFolder/
└── node_module
├── src/
│   ├── index.html
│   └── index.js
├── URL/
│   └── url.json
└── jsconfig.json
└── LICENSE
├── package-lock.json
└── package.json
└── README.md
```

## How It Works

1. Prompts the user to input a destination URL.

2. Generates a unique short ID using nanoid.

3. Maps the provided URL to the newly generated ID.

4. Stores the mapping persistently in a local url.json file.

## Getting Started

To run this prototype locally, ensure you have Node.js installed, then install the required packages and run the application:

### Install required dependencies

```text
npm install inquirer nanoid
```

### Run the application

```text
node src/index.js
```

## Demo

Here is the output of the URL Shortener in action:

<video src="https://github.com/buntai-fries/URL_Shortner_API/tree/main/Output/Output.mp4" controls="controls" width="600" title="URL Shortener CLI Demo 1"></video>

## 📄 License

This project is licensed under the [MIT](https://opensource.org/license/mit) License.
