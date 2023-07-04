// on is for takinig request
// emit is to emits to new request

exports.chatSocket = function (socketServer) {
  let io = require("socket.io")(socketServer, {
    cors: {
      origin: "*",
    },
  });

  // recevie connetion request from  client
  io.sockets.on("connection", function (socket) {
    console.log("a connection received ", socket.id);

    socket.on("disconnect", function () {
      console.log("socket disconnected!");
    });

    socket.on("join_room", function (data) {
      console.log("joining request rec.", data);

      socket.join(data.chatroom);

      io.in(data.chatroom).emit("user_joined", data);
    });

    socket.on('send_message', function(data){
      io.in(data.chatroom).emit('receive_message', data);
  });
  
  });
};
