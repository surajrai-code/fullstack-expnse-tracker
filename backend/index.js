const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./database");

app.use(cors());
app.use(bodyParser.json());

app.post("/signup", (req, res) => {
  const { name, email, password, cpassword } = req.body;

  db.execute(
    "INSERT INTO user (name,email, password, cpassword) VALUES (?, ?, ?, ?)",
    [name, email, password, cpassword]
  )
    .then((result) => {
      res.status(200).json({ message: "User registered successfully" });
      console.log(result);
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: "An error occurred while registering the user" });
      console.log(`Error ${error}`);
    });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.execute("SELECT * FROM user WHERE email = ?", [email])
    .then(([rows]) => {
      if (rows.length === 0) {
        return res.status(401).json({ message: "User not found" });
      }

      const user = rows[0];
      if (user.password !== password) {
        return res.status(401).json({ message: "Invalid password" });
      }

      // At this point, user authentication is successful
      res.status(200).json({ message: "User authenticated successfully" });
    })
    .catch((error) => {
      res.status(500).json({ message: "An error occurred during login" });
      console.log(`Error ${error}`);
    });
});
const PORT = 3000;
app.listen(PORT, "localhost", () => {
  console.log(`Server is running on port ${PORT}`);
});
