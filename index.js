// require dotenv for accessing secured variables ${dbPassword}
require('dotenv').config();

// establish connection to database
require('./database/mongoConnection');

const express = require("express");
const app = express();
const PORT = 3000 || process.env.PORT;
const server = require('http').createServer(app);
const io = require('socket.io')(server , {cors:{origin:"*"}});

io.on('connection' , (socket)=>{
    console.log("socket connected");

    socket.on("message",(data)=>{
        console.log(data);
    });
})

app.get('/home', (req , res)=>{
    res.status(200).json({message:"done"})
});

server.listen(PORT , ()=>{
    console.log(`Server running on ${PORT}`)
});