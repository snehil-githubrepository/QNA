import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Grid,
  IconButton,
  TextField,
  Typography,
  Paper,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";

const QUESTIONS = [];

export const Landing = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [userUpvotes, setUserUpvotes] = useState({});

  const handleQuestionSubmit = () => {
    if (newQuestion.trim() !== "") {
      const updatedQuestions = [
        ...questions,
        { text: newQuestion, upvotes: 0 },
      ];
      setQuestions(updatedQuestions);
      setNewQuestion("");
      QUESTIONS.push({ text: newQuestion, upvotes: 0 }); // Update the global QUESTIONS array
    }
  };

  const handleUpvote = (index) => {
    if (!userUpvotes[index]) {
      const updatedQuestions = [...questions];
      updatedQuestions[index].upvotes += 1;
      setQuestions(updatedQuestions);
      setUserUpvotes({ ...userUpvotes, [index]: true });
    }
  };

  return (
    <Container>
      <Card style={{ backgroundColor: "#4169E1", margin: 15 }}>
        <Typography
          variant="h2"
          align="center"
          style={{ fontFamily: "cursive" }}
          gutterBottom
        >
          QNA Website
        </Typography>
      </Card>
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
            {questions.map((question, index) => (
              <div key={index}>
                <ListItem>
                  <QuestionAnswerIcon
                    color="primary"
                    style={{ margin: "15" }}
                  />
                  <ListItemText
                    primary={
                      <Typography variant="body1" style={{ fontSize: "18px" }}>
                        {question.text}
                      </Typography>
                    }
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleUpvote(index)}
                    disabled={userUpvotes[index]}
                    style={{ marginLeft: "auto" }}
                  >
                    <ThumbUpIcon style={{ marginRight: "4px" }} />
                    Upvote ({question.upvotes})
                  </Button>
                </ListItem>
                {index !== questions.length - 1 && <Divider />}
              </div>
            ))}
          </List>
        </Grid>
      </Grid>
    </Container>
  );
};
