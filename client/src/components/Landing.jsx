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
  CssBaseline, // Add CssBaseline to reset browser-specific styles
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";

const QUESTIONS = [];

export const Landing = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [userUpvotedQuestions, setUserUpvotedQuestions] = useState([]);

  const handleQuestionSubmit = () => {
    if (newQuestion.trim() !== "") {
      const updatedQuestions = [
        ...questions,
        { id: Date.now(), text: newQuestion, upvotes: 0 },
      ];
      setQuestions(updatedQuestions);
      setNewQuestion("");
      QUESTIONS.push({ id: Date.now(), text: newQuestion, upvotes: 0 }); // Update the global QUESTIONS array
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
    background: "#4caf50", // Green background color for upvoted button
    color: "white", // White text color for upvoted button
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
      <CssBaseline /> {/* Apply a baseline CSS reset */}
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
                            {parseLinks(question.text)}
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
