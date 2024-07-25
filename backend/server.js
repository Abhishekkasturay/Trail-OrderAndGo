const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const authRoutes = require("./routes/auth");
const trainRoutes = require("./routes/train");
require("dotenv").config(); // Load environment variables from .env file

const app = express();

// Use body-parser to parse JSON requests
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

// Use routes for authentication and train functionalities
app.use("/api/auth", authRoutes);
app.use("/api/trains", trainRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/build", "index.html"));
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
