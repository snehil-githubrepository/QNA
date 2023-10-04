import React, { useState } from "react";
import {
  Button,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

export const Landing = () => {
  const [userUpvotedQuestions, setUserUpvotedQuestions] = useState([]);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const sampleQuestions = [
    { id: 1, text: "How can I use React?", upvotes: 10 },
    { id: 2, text: "What is the best UI framework?", upvotes: 15 },
    { id: 3, text: "What is the best KI framework?", upvotes: 123 },
    {
      id: 4,
      text: "https://chat.openai.com/",
      upvotes: 125,
    },
    { id: 5, text: "What is the best PI framework?", upvotes: 11 },
    // Add more sample questions or load from an API/database
  ];

  const [questions, setQuestions] = useState(sampleQuestions);

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

  const isAdmin = true;

  const sortedQuestions = [...questions].sort((a, b) => b.upvotes - a.upvotes);

  const handleDeleteAllChats = () => {
    // Open the confirmation dialog
    setDeleteDialogOpen(true);
  };

  const confirmDeleteAllChats = () => {
    // Implement the logic to delete all questions here
    // For this example, we'll simply set the questions array to an empty array
    setQuestions([]);
    // Close the confirmation dialog
    setDeleteDialogOpen(false);
  };

  const cancelDeleteAllChats = () => {
    // Close the confirmation dialog without deleting
    setDeleteDialogOpen(false);
  };

  return (
    <Container>
      <Typography variant="h2" align="center" gutterBottom>
        Admin Dashboard
      </Typography>

      <Grid item xs={12}>
        <Typography variant="h5">
          Questions:
          <Button
            variant="contained"
            color="secondary"
            style={{ marginLeft: "10px", backgroundColor: "#ff0000" }} // Red background color
            onClick={handleDeleteAllChats}
          >
            Delete all Chat
          </Button>
        </Typography>
        <Dialog open={isDeleteDialogOpen}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            Are you sure you want to delete all chats? This action cannot be
            undone.
          </DialogContent>
          <DialogActions>
            <Button onClick={cancelDeleteAllChats} color="primary">
              Cancel
            </Button>
            <Button onClick={confirmDeleteAllChats} color="primary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
        <List>
          {sortedQuestions.map((question) => (
            <div key={question.id}>
              <Card variant="outlined" style={{ marginBottom: "16px" }}>
                <CardContent>
                  <ListItem>
                    <QuestionAnswerIcon
                      color="primary"
                      style={{ marginRight: 15 }}
                    />
                    <ListItemText
                      primary={
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            background: userUpvotedQuestions.includes(
                              question.id
                            )
                              ? "#4caf50"
                              : "inherit",
                            color: userUpvotedQuestions.includes(question.id)
                              ? "white"
                              : "inherit",
                          }}
                        >
                          <div>
                            <Typography
                              variant="body1"
                              style={{ fontSize: "18px" }}
                            >
                              {parseLinks(question.text)}
                            </Typography>
                          </div>
                          <div>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => handleUpvote(question)}
                              disabled={
                                userUpvotedQuestions.includes(question.id) ||
                                isAdmin
                              }
                              style={{
                                backgroundColor: userUpvotedQuestions.includes(
                                  question.id
                                )
                                  ? "#4caf50"
                                  : "#90EE90",
                                pointerEvents: "none",
                              }}
                            >
                              <ThumbUpIcon />
                            </Button>
                            <span style={{ marginLeft: "4px" }}>
                              {question.upvotes}
                            </span>
                          </div>
                        </div>
                      }
                    />
                  </ListItem>
                </CardContent>
              </Card>
            </div>
          ))}
        </List>
      </Grid>
    </Container>
  );
};
