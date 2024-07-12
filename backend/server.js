const fs = require("fs");
const http = require("http");
const generatePerson = require("./createPerson");
const url = require("url");

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  const parsedUrl = url.parse(req.url, true);
  const pathName = parsedUrl.pathname;
  const query = parsedUrl.query;
  switch (pathName) {
    case "/":
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Server is running");
      break;
    case "/person":
      try {
        if(fs.existsSync("./person.json")){
          generatePerson("reset");
        } 
        fs.readFile("./person.json", (err, data) => {
          if (err) throw err;
          let arr = [];
          let sort = query.sort || "firstName";
          let perpage = query.perpage || 10;
          let page = query.page - 1 || 0;
          let skip = page * perpage;
          let reverse = query.reverse === "true" ? -1 : 1;
          for (
            let i = skip;
            i < perpage * (page + 1) && i < JSON.parse(data).length;
            i++
          )
            arr.push(JSON.parse(data)[i]);
          arr.sort((a, b) => a[sort] - b[sort]);
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(
            reverse === -1 ? JSON.stringify(arr.reverse()) : JSON.stringify(arr)
          );
        });
      } catch (error) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Internal Server Error" }));
        return;
      }
      break;
    case "/reset":
      try {
        generatePerson("reset");
        res.writeHead(200, { "Content-type": "application/json" });
        res.end(JSON.stringify({ success: true }));
      } catch (error) {
        res.writeHead(500, { "Content-type": "application/json" });
        res.end(JSON.stringify({ error: "Internal Server Error" }));
      }
      break;
    case "/search":
      try {
        if (!query.s) throw new Error("query s is required");
        let reverse = query.reverse === "true" ? -1 : 1;
        fs.readFile("./person.json", (err, data) => {
          if (err) throw err;
          let arr = [];
          for (let i = 0; i < JSON.parse(data).length; i++) {
            let obj = JSON.parse(data)[i];
            let str = query.s.toString().toLowerCase();
            if (
              obj.firstName.toLowerCase().includes(str)
              //  ||
              // obj.lastName.toLowerCase().includes(str) ||
              // obj.email.toLowerCase().includes(str) ||
              // obj.state.toLowerCase().includes(str) ||
              // obj.country.toLowerCase().includes(str)
            )
              arr.push(obj);
          }

          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(
            reverse === -1 ? JSON.stringify(arr.reverse()) : JSON.stringify(arr)
          );
        });
      } catch (error) {
        res.writeHead(500, { "Content-type": "application/json" });
        res.end(JSON.stringify({ error: "make sure query s is required" }));
      }
      break;
    default:
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not Found");
  }
});

generatePerson();

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
