class chatEngine {
  constructor(chatBoxId, userEmail) {
    this.chatBox = $(`#${chatBoxId}`);
    this.userEmail = userEmail;

    // io is global object given by cdn used in the home.ejs
    //this will request connection with the server
    this.socket = io.connect("http://localhost:5000");
    // this.socket = io.connect("http://13.53.197.7/:5000");
    if (this.userEmail) {

      this.connectionHandler();
    }
  }

  connectionHandler() {
    let self = this;

    this.socket.on("connect", function () {
      console.log("connection established using sockets...!");

      self.socket.emit("join_room", {
        user_email: self.userEmail,
        chatroom: "social media",
      });

      self.socket.on("user_joined", function (data) {
        console.log("a user joined!", data);
      });
    });

    // CHANGE :: send a message on clicking the send message button
    $("#send-message").click(function () {
      let msg = $("#chat-message-input").val();

      if (msg != "") {
        self.socket.emit("send_message", {
          message: msg,
          user_email: self.userEmail,
          chatroom: "social media",
        });
      }
    });

    self.socket.on("receive_message", function (data) {
      console.log("message received", data.message);

      let newMessage = $('<p>');

      let messageType = "other-message";

      if (data.user_email == self.userEmail) {
        messageType = "self-message";
      }

      newMessage.append(
        $('<span>', {
          html: data.message,
        }));

      newMessage.append(
        $('<p>', {
          html: data.user_email,
        }));

      newMessage.addClass(messageType);

      $("#chat-messages-list").append(newMessage);
    });
  }
}
