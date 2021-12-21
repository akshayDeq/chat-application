// require dotenv for accessing secured variables ${dbPassword}
require("dotenv").config();

// require all modules
const express = require("express");
const app = express();
const cors = require("cors");
const socket = require("./socket/ws");
const roomRouter = require("./routes/room.route.js");
const server = require("http").createServer(app);
const connectMongoDB = require("./database/mongoConnection");

// establish connection to database
let connection = connectMongoDB();
connection.catch(() => {
  throw new Error("Database connection failed");
});

const PORT = 3000 || process.env.PORT;

// include middlewares
app.use(cors());
app.use(express.json());
app.use(roomRouter);
app.use(express.static(`${__dirname}/static`));

// Instantiate the socket server
socket(server);

server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
