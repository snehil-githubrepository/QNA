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

// Sample questions for testing
const sampleQuestions = [
  {
    id: 1,
    text: "KSI forehead framework? KSI forehead framework? KSI forehead framework? KSI forehead framework? KSI forehead framework? KSI forehead framework?KSI forehead framework?KSI forehead framework?KSI forehead framework? KSI forehead framework? KSI forehead framework?KSI forehead framework? KSI forehead framework? KSI forehead framework? KSI forehead framework? KSI forehead framework?KSI forehead framework?",
    upvotes: 100,
    answered: false,
  },
  {
    id: 2,
    text: "What is the best UI framework?",
    upvotes: 15,
    answered: false,
  },
  {
    id: 3,
    text: "What is the best KI framework?",
    upvotes: 123,
    answered: false,
  },
  {
    id: 4,
    text: "https://chat.openai.com/",
    upvotes: 125,
    answered: false,
  },
  {
    id: 5,
    text: "What is the best PI framework?",
    upvotes: 11,
    answered: false,
  },
  {
    id: 6,
    text: "What is the best PI framework?",
    upvotes: 11,
    answered: false,
  },
  {
    id: 7,
    text: "What is the best PI framework?",
    upvotes: 11,
    answered: false,
  },
  {
    id: 8,
    text: "What is the best PI framework?",
    upvotes: 11,
    answered: false,
  },
  {
    id: 9,
    text: "What is the best PI framework?",
    upvotes: 11,
    answered: false,
  },
  {
    id: 10,
    text: "What is the best PI framework?",
    upvotes: 300,
    answered: false,
  },
  { id: 11, text: "twitter wins", upvotes: 3000, answered: false },
  // Add more sample questions or load from an API/database
];

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.emit("sampleQuestions", sampleQuestions);

  socket.on("getQuestions", () => {
    socket.emit("sampleQuestions", sampleQuestions);
  });

  socket.on("markQuestionAsAnswered", (questionId) => {
    // Find the question with the specified ID and update the 'answered' property
    const questionIndex = sampleQuestions.findIndex(
      (question) => question.id === questionId
    );
    if (questionIndex !== -1) {
      sampleQuestions[questionIndex].answered = true;
      console.log(sampleQuestions[questionIndex].answered);
      // Emit the updated questions to all connected clients
      io.emit("sampleQuestions", sampleQuestions);
    }
  });

  // setTimeout(() => {
  //   socket.emit(
  //     "questions",
  //     questions.filter((que) => !que.answered)
  //   );
  // }, 200);

  // socket.on("submitQuestion", (newQuestion) => {
  //   // Store the new question on the server
  //   questions.push({
  //     id: questions.length,
  //     username: data.username,
  //     ques: data.ques,
  //     upvotes: 1,
  //     upvoters: [socket.id],
  //     answered: false,
  //   });
  //   questions.sort((a, b) => b.upvoters.length - a.upvoters.length);

  //   io.emit(
  //     "questions",
  //     questions.filter((que) => !que.answered)
  //   );

  //   // questions.push(newQuestion);

  //   // // Emit the new question to all connected clients
  //   // io.emit("newQuestion", newQuestion);
  // });

  // socket.on("ques", (data) => {
  //   questions.push({
  //     id: questions.length,
  //     username: data.username,
  //     ques: data.ques,
  //     upvotes: 1,
  //     upvoters: [socket.id],
  //     answered: false,
  //   });
  //   questions.sort((a, b) => b.upvoters.length - a.upvoters.length);
  //   console.log(questions);
  //   io.emit(
  //     "questions",
  //     questions.filter((que) => !que.answered)
  //   );
  // });

  // //
  // socket.on("upvote", (data) => {
  //   questions.forEach((que) => {
  //     if (que.id === data.id) {
  //       if (!que.upvoters.includes(socket.id)) {
  //         que.upvoters.push(socket.id);
  //       }
  //     }
  //   });
  //   questions.sort((a, b) => b.upvoters.length - a.upvoters.length);
  //   console.log(questions);
  //   io.emit(
  //     "questions",
  //     questions.filter((que) => !que.answered)
  //   );
  // });

  // //delete all functionality for the admin.
  // socket.on("deleteall", () => {
  //   questions = [];
  //   io.emit("questions", questions);
  // });

  // //this is for admin, We emit the unanswered Questions to admin
  // socket.on("answered", (data) => {
  //   questions.forEach((q) => {
  //     if (q.id === data.id) {
  //       q.answered = true;
  //     }
  //   });
  //   questions.sort((a, b) => b.upvoters.length - a.upvoters.length);
  //   console.log(questions);
  //   io.emit(
  //     "questions",
  //     questions.filter((q) => !q.answered)
  //   );
  // });
});

server.listen(8000, () => {
  console.log("Server is running on port : 8000");
});
