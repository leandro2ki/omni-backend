const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

//qdo receber a conexao do front
io.on("connection", socket => {
  //quando receber a conexao connectRoom
  socket.on("connectRoom", box => {
    //entra na sala box
    socket.join(box);
  });
});

mongoose.connect(
  "mongodb+srv://omnistack:omnistack@cluster0-xjll8.mongodb.net/omnistack?retryWrites=true",
  {
    useNewUrlParser: true
  }
);

app.use(cors);

//middleware para acessar o io
app.use((req, res, next) => {
  req.io = io;

  return next();
});

app.use(express.json());
//permite envio de arquivos
app.use(express.urlencoded({ extended: true }));
app.use("/files", express.static(path.resolve(__dirname, "tmp")));

app.use(require("./routes"));

server.listen(process.env.PORT || 3333);
// app.listen(3333);
