const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const trainRoutes = require("./routes/train");
require("dotenv").config(); // Load environment variables from .env file

const app = express();

// Allow CORS from specific origins
const corsOptions = {
  origin: "https://abhishekkasturay.github.io/OrderAndGo/", // Replace with your frontend domain
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

// Debug: Print the MongoDB URI to verify it's being loaded correctly
console.log("MongoDB URI:", process.env.MONGODB_URI);

// Connect to MongoDB Atlas using the environment variable
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Use routes
app.use("/api/auth", authRoutes);
app.use("/api/trains", trainRoutes); // Add this line

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
