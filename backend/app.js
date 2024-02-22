const express = require("express");

const app = express();

//MIDDLEWARE
app.use(express.json());

//ROUTES
app.use("/", (req, res, next) => {
  res.json("Backend. Running....");
});

//SEVER
const post = 8080;
app.listen(post, () => {
  console.log(`Server running on port ${post}`);
});
