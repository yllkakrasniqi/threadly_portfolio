const mongoose = require("mongoose");
const config = require('../config');

const { db: { host, port, name} } = config
const mongo_uri = `mongodb://${host}:${port}/${name}`;

connectDB = async () => {
  mongoose
    .connect(mongo_uri, {
    })
    .then(() => {
      console.log("Connected to Mongo!");
    })
    .catch((err) => {
      console.error("Error connecting to Mongo", err);
    });
};

module.exports = connectDB
  