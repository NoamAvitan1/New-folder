const { faker } = require("@faker-js/faker");
const fs = require("fs");

module.exports = function generatePerson(str) {
  if (str != undefined || !fs.existsSync("./person.json")) {
    const array = [];
    for (let i = 0; i < 100; i++) {
      let obj = {
        id : i,
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        state: faker.location.state(),
        country: faker.location.country(),
      };
      array.push(obj);
    }
    fs.writeFileSync("./person.json", JSON.stringify(array), () => {
      console.log("file created successfully");
    });
  }
};
