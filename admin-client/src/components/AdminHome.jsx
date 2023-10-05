import React, { useEffect, useState } from "react";
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
import { io } from "socket.io-client";

const socket = io("http://127.0.0.1:8000/");

export const AdminHome = () => {
  const [userUpvotedQuestions, setUserUpvotedQuestions] = useState([]);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false); //confirmation for deleting
  const [refreshInterval, setRefreshInterval] = useState(null);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    // Request questions from the server when the component mounts
    socket.emit("getQuestions");

    // Listen for questions from the server
    socket.on("sampleQuestions", (receivedQuestions) => {
      // Filter out questions with 'answered' set to 'true'
      const unansweredQuestions = receivedQuestions.filter(
        (question) => !question.answered
      );

      // Update the questions state with the unanswered questions
      setQuestions(unansweredQuestions);
    });

    // Set up a refresh interval to periodically request questions
    const intervalId = setInterval(() => {
      socket.emit("getQuestions");
    }, 5000); // Fetch questions every 5 seconds (adjust as needed)

    // Store the interval ID to clear it when the component unmounts
    setRefreshInterval(intervalId);

    // Clean up the interval when the component unmounts
    return () => {
      if (refreshInterval) {
        clearInterval(refreshInterval);
      }
    };
  }, []);

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

  // For listing links in the texts
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

  /* ------------------------------------------------------------------------------- */
  const handleDeleteAllChats = () => {
    // Open the confirmation dialog
    setDeleteDialogOpen(true);
  };

  const handleQuestionDelete = (questionId) => {
    // delete specific question
    const updatedQuestions = questions.filter(
      (question) => question.id !== questionId
    );
    socket.emit("markQuestionAsAnswered", questionId);
    setQuestions(updatedQuestions);
  };

  const confirmDeleteAllChats = () => {
    setQuestions([]); //deleted all the questions
    setDeleteDialogOpen(false);
  };

  const cancelDeleteAllChats = () => {
    //cancel on confirmation dialog
    setDeleteDialogOpen(false);
  };

  /* ------------------------------------------------------------------------------- */

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
                            <span style={{ margin: "8px" }}>
                              {question.upvotes}
                            </span>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => {
                                handleQuestionDelete(question.id);
                              }}
                              style={{
                                backgroundColor: "blue",
                                marginRight: "8px",
                              }}
                            >
                              Answered
                            </Button>
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
