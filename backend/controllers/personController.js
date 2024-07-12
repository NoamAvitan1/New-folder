const Person = require("../model/personModel");
const url = require("url");

const getPerson = async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const query = parsedUrl.query;
  console.log(parsedUrl);
  try {
    let filter = {};
    let sort = query.sort || "id";
    let perpage = query.perpage || 10;
    let firstName =  query.firstName;
    let page = query.page - 1 || 0;
    let skip = page * perpage;
    let reverse = query.reverse === "true" ? -1 : 1;
    if(firstName){
        filter.firstName = new RegExp(firstName, "i");
    }
    const person = await Person.find(filter)
      .skip(skip)
      .limit(perpage)
      .sort({ [sort]: reverse });
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(person));
  } catch (error) {
    res.writeHead(500, { "Content-type": "application/json" });
    res.end(JSON.stringify({ error: "Internal Server Error" }));
  }
};


module.exports = {
  getPerson,
};


