const { default: mongoose } = require("mongoose");
const Group = require("../model/groupModel");
const Person = require("../model/personModel");

const createGroup = async (req, res) => {
  if (req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => (body += chunk.toString()));
    req.on("end", async () => {
      try {
        let parsedBody = JSON.parse(body);
        const { title, persons } = parsedBody;

        if (
          !Array.isArray(persons) ||
          !persons.every((person) => mongoose.Types.ObjectId.isValid(person))
        ) {
          throw new Error("Invalid persons");
        }

        const checkPersons = await Person.find({ _id: { $in: persons } });

        if (checkPersons.length !== persons.length) {
          throw new Error("Invalid persons");
        }

        const group = new Group({ title, persons });
        await group.save();

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(group));
      } catch (error) {
        console.log(error);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Internal Server Error" }));
      }
    });
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Use POST method" }));
  }
};

module.exports = {
  createGroup,
};
