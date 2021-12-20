
const dbPassword = process.env.DB_PASSWORD;
const dbUsername = process.env.DB_USERNAME;
const dbName = process.env.DB_NAME;
const mongoose = require('mongoose')

async function connectDatabase(){
  try{
    await mongoose.connect(`mongodb+srv://${dbUsername}:${dbPassword}@cluster0.ycshe.mongodb.net/${dbName}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    });
  } catch(err){
    throw Error("Fatal: Database connection lost");
  }
}

module.exports = connectDatabase;