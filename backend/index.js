const fs = require("fs");
const http = require("http");
const generatePerson = require("./createPerson");
const url = require("url");
const { getPerson } = require("./controllers/personController");
const { connectDB } = require("./connectDB");
const { createGroup } = require("./controllers/groupController");

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  const parsedUrl = url.parse(req.url, true);
  const pathName = parsedUrl.pathname;
  switch (pathName) {
    case "/":
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Server is running");
      break;
    case "/person":
      getPerson(req, res);
      break;
    case "/group":
      createGroup(req,res);
      break;
    default:
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not Found");
  }
});

connectDB()
  .then(() =>
    server.listen(3000, () => {
      console.log("Server is running on port 3000");
    })
  )
  .catch((error) => console.log(error));
