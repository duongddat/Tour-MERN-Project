const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const globalErrorHandler = require("./controllers/errorController");
const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRouter");
const tourRouter = require("./routes/tourRouter");
const countryRouter = require("./routes/countryRouter");
const reviewRouter = require("./routes/reviewRouter");
const bookingRouter = require("./routes/bookingRouter");
const postRouter = require("./routes/postRouter");

dotenv.config({ path: "./.env" });
const app = express();

//DATABASE CONNECTIONS
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("DB connection successfully!");
  } catch (error) {
    console.log(error);
  }
};

//MIDDLEWARE
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
//------- Implement CORS
app.use(cors());
//-----------Cookie
app.use(cookieParser());

//ROUTES
app.use("/tours", tourRouter);
app.use("/countries", countryRouter);
app.use("/reviews", reviewRouter);
app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/booking", bookingRouter);
app.use("/posts", postRouter);

app.use(globalErrorHandler);
//SEVER
const post = process.env.PORT || 8000;
app.listen(post, () => {
  connect();
  console.log(`Server running on port ${post}`);
});
