const dbPassword = process.env.DB_PASSWORD;
const dbUsername = process.env.DB_USERNAME;
const dbName = process.env.DB_NAME;
const mongoose = require("mongoose");

let connection;
async function connectMongoDB() {
  if (!connection || connection.connection.readyState != 1) {
    connection = await mongoose.connect(
      `mongodb+srv://${dbUsername}:${dbPassword}@cluster0.ycshe.mongodb.net/${dbName}?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
  }
  return connection;
}

module.exports = connectMongoDB;
