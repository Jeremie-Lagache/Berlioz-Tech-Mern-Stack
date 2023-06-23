const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const io = require("socket.io")(5000, {
  cors: {
    origin: "http://http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

// socketio

io.on("connection", socket => {
  console.log("User Connected", socket.id);

  socket.on("send_message", (message, room) => {
    if (room === "") {
      socket.broadcast.emit("receive-message", message)
    } else {
      console.log(room);
      socket.to(room).emit("receive-message", message)
    }
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
  socket.on('join-room', room => {
    console.log(room);
    console.log("User joined", room);
    socket.join(room)
  })
});

const users = require('./Routes/users');
const projects = require('./Routes/projects')
const chat = require('./Routes/chat')
const message = require('./Routes/message')

mongoose.connect('mongodb+srv://jeremie:12345@database1.5jbub5s.mongodb.net/berlioz-tech');

// users.js requêtes
app.post('/api/register', users.createUser);
app.post('/api/login', users.loginUser);
app.get('/api/dashboard', users.getUserData);
app.get('/api/get-all-users', users.getAllUsers)
app.post('/api/dashboard/profil', users.updateUser)

// projects.js requêtes
app.post('/api/new-project', projects.createProject)
app.get('/api/project-data', projects.getProjectData)
app.delete('/api/delete-project', projects.DeleteProject)

// chat.js requêtes
app.post('/api/new-chat', chat.createChat)
app.delete('/api/delete-chat', chat.DeleteChat)
app.post('/api/new-message', message.createMessage)
app.get('/api/get-messages', message.getMessages)
app.delete('/api/delete-message', message.DeleteMessage)


app.listen(1337, () => {
  console.log('Server started on 1337');
}); 



