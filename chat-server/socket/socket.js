const { Server } = require("socket.io");

let users = {};

function setUpSocket(server) {
    const io = new Server(server,{
        cors:{
            origin:'*',
            methods:["GET","POST"]
        }
    })

  io.on("connection", (socket) => {
    console.log("A user Connected");

    socket.on("join", (name) => {
      users[socket.id] = name;
      socket.broadcast.emit("user-joined", name);
      console.log(`${name} has joined the chat`);
    });

    socket.on("chat", (data) => {
      io.emit("chat-received", data);
      console.log(data)
    });

    // socket.on('leave-chat', (name) => {
    //   users = users.filter(user => user !== name);
    //   io.emit('user-left', name);  // Notify all users that a user has left
    // });
    socket.on("disconnect", () => {
      if (users[socket.id]) {
        socket.broadcast.emit("user-left", users[socket.id]);
        console.log(`${users[socket.id]} left the chat`);
        delete users[socket.id];
      }
    });
  });
  return io;
}

module.exports = setUpSocket;