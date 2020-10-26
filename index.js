const express = require("express");
const generate = require("shortid").generate;

const app = express();
app.use(express.json());

const PORT = 5000;

let users = [{ id: generate(), name: "admin", bio: "Built this" }];

app.get("/api/users", (req, res) => {
  try {
    res.status(200).json(users);
  } catch (err) {
    res
      .status(500)
      .json({ errorMessage: "The users information could not be retrieved." });
  }
});

app.post("/api/users", (req, res) => {
  const { name, bio } = req.body;
  try {
    if (!name || !bio) {
      res
        .status(400)
        .json({ errorMessage: "Please provide name and bio for the user." });
    } else {
      const newUser = { id: generate(), name, bio };
      users.push(newUser);
      res.status(201).json(newUser);
    }
  } catch (err) {
    res.status(500).json({
      errorMessage: "There was an error while saving the user to the database",
    });
  }
});

app.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  try {
    const userId = users.find((user) => users.id === id);
    if (!userId) {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist." });
    } else {
      res.status(200).json(userId);
    }
  } catch (err) {
    res
      .status(500)
      .json({ errorMessage: "The user information could not be retrieved." });
  }
});

app.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  try {
    const userId = users.find((user) => users.id === id);
    if (!userId) {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist." });
    } else {
      const delUser = users.filter((user) => users.id !== id);
      res.status(200).json(delUser);
    }
  } catch (err) {
    res.status(500).json({ errorMessage: "The user could not be removed" });
  }
});

app.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, bio } = req.body;
  try {
    if (!name || !bio) {
      res
        .status(400)
        .json({ errorMessage: "Please provide name and bio for the user." });
    } else {
      const indexOfUser = users.findIndex((user) => user.id === id);
      if (indexOfUser !== -1) {
        users[indexOfUser] = { id, name, bio };
        res.status(200).json({ id, name, bio });
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    }
  } catch (err) {
    res
      .status(500)
      .json({ errorMessage: "The user information could not be modified." });
  }
});
