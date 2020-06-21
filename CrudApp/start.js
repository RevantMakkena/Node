const fs = require("fs");
const path = require("path");
const source = path.join(__dirname, "courses.json");
const target = path.join(__dirname, "data.json");

const storeData = (source, target) => {
  try {
    fs.writeFileSync(target, JSON.stringify(source));
  } catch (err) {
    console.error(err);
  }
};

storeData();
