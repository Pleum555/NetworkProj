// const express = require("express")
// const app = express()
// const dotenv = require('dotenv');
// const connectDB = require("./config/db");
// const cors = require("cors")
// const http = require('http').Server(app);
// const PORT = 4000
// const socketIO = require('socket.io')(http, {
//     cors: {
//         //origin: http://localhost:3000
//         origin: ["http://localhost:3000","172.20.10.3:3000"]
//     }
// });
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   next();
// });

// //Route files
// const rooms = require('./routes/room');
// const directrooms = require('./routes/directroom');

// //Load env vars
// dotenv.config({path:'./config/config.env'});

// //Connect to database
// connectDB();
// app.use(express.json());

// const corsOptions = {
//   origin: ["http://localhost:3000","172.20.10.3:3000"],
//   credentials: true,
// };
// app.use(cors(corsOptions));

// //Mount routers
// app.use('/api/v1/rooms', rooms);
// app.use('/api/v1/directrooms', directrooms);

// let users = []
// let chatrooms = []

// socketIO.origins(["http://localhost:3000","172.20.10.3:3000"]);

// socketIO.on('connection', (socket) => {
//     console.log(`🚀: ${socket.id} user just connected!`)

//     socket.on("joinroom", data => {
//       socket.leave(data.oldchatname)
//       socket.join(data.chatname)
//       // Add this
//     // Send message to all users currently in the room, apart from the user that just joined
//     socketIO.to(data.chatname).emit('messageResponse', {
//       chatname: data.chatname,
//       text: "someone has joined the chat room", 
//       name: "chatbot", 
//       id: `${socket.id}${Math.random()}`,
//       socketID: socket.id
//     });
//     })

//     socket.on("message", data => {
//       socketIO.to(data.chatname).emit("messageResponse", data)
      
//     })

//     socket.on("typing", data => (
//       socket.broadcast.emit("typingResponse", data)
//     ))

//     socket.on("newUser", data => {
//       users.push(data)
//       socketIO.emit("newUserResponse", users)
//     })
 
//     socket.on('disconnect', () => {
//       console.log('🔥: A user disconnected');
//       users = users.filter(user => user.socketID !== socket.id)
//       socketIO.emit("newUserResponse", users)
//       socket.disconnect()
//     });
// });

// app.get("/api", (req, res) => {
//   res.json({message: "Hello"})
// });

   
// http.listen(PORT, () => {
//     console.log(`Server listening on ${PORT}`);
// });


const express = require("express")
const app = express()
const dotenv = require('dotenv');
const connectDB = require("./config/db");
const cors = require("cors")
const http = require('http').Server(app);
const PORT = 4000
const io = require('socket.io')(http, {
  cors: {
    origin: ["http://localhost:3000", "http://172.20.10.3:3000"],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true
  }
});

//Route files
const rooms = require('./routes/room');
const directrooms = require('./routes/directroom');

//Load env vars
dotenv.config({path:'./config/config.env'});

//Connect to database
connectDB();
app.use(express.json());

const corsOptions = {
  origin: ["http://localhost:3000","http://172.20.10.3:3000"],
  credentials: true,
};
app.use(cors(corsOptions));

//Mount routers
app.use('/api/v1/rooms', rooms);
app.use('/api/v1/directrooms', directrooms);

let users = []
let chatrooms = []

io.on('connection', (socket) => {
    console.log(`🚀: ${socket.id} user just connected!`)

    socket.on("joinroom", data => {
      socket.leave(data.oldchatname)
      socket.join(data.chatname)
      // Add this
    // Send message to all users currently in the room, apart from the user that just joined
    io.to(data.chatname).emit('messageResponse', {
      chatname: data.chatname,
      text: `${data.myname} has joined the chat room`, 
      name: "chatbot", 
      id: `${socket.id}${Math.random()}`,
      socketID: socket.id
    });
    })

    socket.on("message", data => {
      io.to(data.chatname).emit("messageResponse", data)
      
    })

    socket.on("typing", data => (
      socket.broadcast.to(data.chatname).emit("typingResponse", data)
    ))

    socket.on("newUser", data => {
      users.push(data)
      io.emit("newUserResponse", users)
    })
 
    socket.on('disconnect', () => {
      console.log('🔥: A user disconnected');
      users = users.filter(user => user.socketID !== socket.id)
      io.emit("newUserResponse", users)
      socket.disconnect()
    });
});

app.get("/api", (req, res) => {
  res.json({message: "Hello"})
});

http.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
