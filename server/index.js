const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer();

//emit -> sender
//on -> receiver

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
let questions = [];
io.on("connection", (socket) => {
  setTimeout(() => {
    socket.emit(
      "questions",
      questions.filter((que) => !que.answered)
    );
  }, 200);

  socket.on("ques", (data) => {
    questions.push({
      id: questions.length,
      username: data.username,
      ques: data.ques,
      upvotes: 1,
      upvoters: [socket.id],
      answered: false,
    });
    questions.sort((a, b) => b.upvoters.length - a.upvoters.length);
    console.log(questions);
    io.emit(
      "questions",
      questions.filter((que) => !que.answered)
    );
  });
  socket.on("upvote", (data) => {
    questions.forEach((que) => {
      if (que.id === data.id) {
        if (!que.upvoters.includes(socket.id)) {
          que.upvoters.push(socket.id);
        }
      }
    });
    questions.sort((a, b) => b.upvoters.length - a.upvoters.length);
    console.log(questions);
    io.emit(
      "questions",
      questions.filter((que) => !que.answered)
    );
  });
  socket.on("deleteall", () => {
    questions = [];
    io.emit("questions", questions);
  });
  socket.on("answered", (data) => {
    questions.forEach((que) => {
      if (que.id === data.id) {
        que.answered = true;
      }
    });
    questions.sort((a, b) => b.upvoters.length - a.upvoters.length);
    console.log(questions);
    io.emit(
      "questions",
      questions.filter((que) => !que.answered)
    );
  });
});

server.listen(8000, () => {
  console.log("Server is running on port : 8000");
});
