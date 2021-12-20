// require dotenv for accessing secured variables ${dbPassword}
require('dotenv').config();

// establish connection to database
require('./database/mongoConnection')();
const express = require("express");
var cors = require('cors');
const app = express();
const PORT = 3000 || process.env.PORT;
const server = require('http').createServer(app);
const roomRouter = require('./routes/room.route.js');

app.use(cors());
app.use(express.json());
app.use(roomRouter);
app.use(express.static(`${__dirname}/static`));

// require ws.js file 
const socket = require('./socket/ws');
socket(server);

server.listen(PORT , ()=>{
    console.log(`Server running on ${PORT}`)
});