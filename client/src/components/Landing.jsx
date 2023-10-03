import React, { useState } from "react";
import {
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Paper,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  CssBaseline,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import { io } from "socket.io-client";

const socket = io("http://127.0.0.1:8000/");

const initialQuestion = {
  ques: "",
  username: "",
  id: 0,
  upvotes: 0,
  upvoters: [],
  answered: false,
};

export const Landing = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [userUpvotedQuestions, setUserUpvotedQuestions] = useState([]);

  const handleQuestionSubmit = () => {
    if (newQuestion.trim() !== "") {
      const updatedQuestions = [
        ...questions,
        {
          id: Date.now(),
          ques: newQuestion, // Updated to use the 'ques' property
          username: "", // You can update 'username' as needed
          upvotes: 0,
          upvoters: [],
          answered: false,
        },
      ];
      setQuestions(updatedQuestions);
      setNewQuestion("");
    }
  };

  const handleUpvote = (question) => {
    if (!userUpvotedQuestions.includes(question.id)) {
      const updatedQuestions = questions.map((q) =>
        q.id === question.id ? { ...q, upvotes: q.upvotes + 1 } : q
      );
      updatedQuestions.sort((a, b) => b.upvotes - a.upvotes);
      setQuestions(updatedQuestions);
      setUserUpvotedQuestions((prevUpvoted) => [...prevUpvoted, question.id]);
    }
  };

  const buttonStyle = {
    marginLeft: "auto",
    background: "#4caf50",
    color: "white",
  };

  const parseLinks = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);
    return parts.map((part, index) =>
      urlRegex.test(part) ? (
        <a key={index} href={part} target="_blank" rel="noopener noreferrer">
          {part}
        </a>
      ) : (
        part
      )
    );
  };

  return (
    <Container>
      <CssBaseline />
      <Typography variant="h2" align="center" gutterBottom>
        Q&A Website
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper elevation={3}>
            <TextField
              fullWidth
              variant="outlined"
              label="Ask a question"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
            />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleQuestionSubmit}
          >
            Submit
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5">Questions:</Typography>
          <List>
            {questions.map((question) => (
              <div key={question.id}>
                <Card variant="outlined" style={{ marginBottom: "16px" }}>
                  <CardContent>
                    <ListItem>
                      <QuestionAnswerIcon
                        color="primary"
                        style={{ marginRight: "15" }}
                      />
                      <ListItemText
                        primary={
                          <Typography
                            variant="body1"
                            style={{ fontSize: "18px" }}
                          >
                            {parseLinks(question.ques)}{" "}
                            {/* Updated to use 'ques' */}
                          </Typography>
                        }
                      />
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleUpvote(question)}
                        disabled={userUpvotedQuestions.includes(question.id)}
                        style={
                          userUpvotedQuestions.includes(question.id)
                            ? buttonStyle
                            : null
                        }
                      >
                        <PeopleIcon style={{ marginRight: "4px" }} />(
                        {question.upvotes})
                      </Button>
                    </ListItem>
                  </CardContent>
                </Card>
              </div>
            ))}
          </List>
        </Grid>
      </Grid>
    </Container>
  );
};
