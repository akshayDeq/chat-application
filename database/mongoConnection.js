// getting the password from environment variables
const dbPassword = process.env.DB_PASSWORD;

const mongoose = require('mongoose')
mongoose.connect(`mongodb+srv://akanojiya:${dbPassword}@cluster0.ycshe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('DB Connected');
}).catch((err) => {
  console.log(err);
})