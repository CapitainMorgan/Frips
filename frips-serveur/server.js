const fs = require("fs")

let sslOptions = {
   key: fs.readFileSync('api.myfrips.ch-2023-02-13.key'),
   cert: fs.readFileSync('api.myfrips.ch-2023-02-13.crt')
};

const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const helmet = require("helmet");
const path = require("path");
const http = require("http");
const https = require("https");
const cors = require("cors");
const server = https.createServer(sslOptions,app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
  forceNew: true,
  upgrade: false,
  rejectUnauthorized: false,
});
const { PrismaClient } = require("@prisma/client");
let onlineUsers = [];

const prisma = new PrismaClient();

app.use(cors());
app.use(express.json({ extended: false }));

app.use(express.static("public"));

app.get("/", async (req, res) => {
  res.send("API IS RUNNING");
});

app.use("/api/user", require("./routes/user"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/items", require("./routes/items"));
app.use("/api/members", require("./routes/members"));
app.use("/api/conversation", require("./routes/conversation"));
app.use("/api/edit", require("./routes/edit"));
app.use("/api/infoItem", require("./routes/infoItem"));
app.use("/api/paymentIntent", require("./routes/payment"));
app.use("/api/test", require("./routes/test"));

const addNewUser = (userId, socketId) => {
  const user = onlineUsers.some((user) => user.userId === userId);
  if (user?.socketId !== socketId) {
    removeUser(user.socketId);
  }

  return onlineUsers.push({ userId, socketId });
};
const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return onlineUsers.find((user) => user.userId === userId);
};

try {
  io.on("connection", (socket) => {
    console.log("A User connected to socket io");

    socket.on("join", (socket) => {
      addNewUser(socket.userId, socket.socketId);
    });

    socket.on("join room", (room) => {
      console.log("new room joined");
      socket.join(room);
    });
    socket.on("new message", (newMessage) => {
      const { id, id_Receiver, chat_id, item, Price } = newMessage;
      const user = getUser(id_Receiver);
      try {
        if (io.sockets.adapter.rooms.get(id)?.has(user?.socketId)) {
          socket.to(id).emit("message received", {
            id_Sender: newMessage.id_Sender,
            id_Receiver: newMessage.id_Receiver,
            id_Chat: newMessage.id,
            Date_Houre: newMessage.date,
            Text: newMessage.Message.text,
            id_Item: Boolean(item?.id) ? item?.id : null,
            item: Boolean(item)
              ? {
                  Price: item.Price,
                  id: item.id,
                  pricepropose: [
                    {
                      Price: parseFloat(Price),
                      SendDate: new Date(),
                      Approve: null,
                      id_Account:id_Sender,
                      dateApprove: null,
                    },
                  ],
                  image: [{ image: item.image[0].image }],
                }
              : null,
            newMessage: true,
          });
        } else {
          socket.to(user?.socketId).emit("message notification", {
            id_Sender: newMessage.id_Sender,
            imageSender: newMessage.imageSender,
            Text: newMessage.Message.text,
            id_Receiver: newMessage.id_Receiver,
            Date_Houre: newMessage.date,
            id_Chat: newMessage.id,
            Unread: true,
            newMessage: true,
          });
        }
      } catch (error) {
        console.log(error);
      }
    });

    socket.on("unsubscribe", (room) => {
      console.log("leave room");

      socket.leave(room);

      console.dir(io.sockets.adapter.rooms, { depth: true });
    });
    socket.on("disconnect", () => {
      console.log("User disconnect");

      removeUser(socket.id);
    });
  });
} catch (error) {
  console.log(error);
}

server.listen(PORT);
