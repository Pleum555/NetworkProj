const express = require("express")
const app = express()
const dotenv = require('dotenv');
const connectDB = require("./config/db");
const cors = require("cors")
const http = require('http').Server(app);
const PORT = 4000
const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000"
    }
});

//Route files
const rooms = require('./routes/room');

//Load env vars
dotenv.config({path:'./config/config.env'});

//Connect to database
connectDB();
app.use(express.json());
app.use(cors())

//Mount routers
app.use('/api/v1/rooms', rooms);

let users = []
let chatrooms = []

socketIO.on('connection', (socket) => {
    console.log(`🚀: ${socket.id} user just connected!`)  
    socket.on("message", data => {
      socketIO.emit("messageResponse", data)
    })

    socket.on("typing", data => (
      socket.broadcast.emit("typingResponse", data)
    ))

    socket.on("newUser", data => {
      users.push(data)
      socketIO.emit("newUserResponse", users)
    })
 
    socket.on('disconnect', () => {
      console.log('🔥: A user disconnected');
      users = users.filter(user => user.socketID !== socket.id)
      socketIO.emit("newUserResponse", users)
      socket.disconnect()
    });
});

app.get("/api", (req, res) => {
  res.json({message: "Hello"})
});

   
http.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});