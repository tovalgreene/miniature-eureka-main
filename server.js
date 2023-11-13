const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;

// Importing route modules from the routes folder
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");

// Middleware for static files, URL encoding, and JSON parsing
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Use routes from the routes folder
app.use("/api", apiRoutes); // API routes
app.use("/", htmlRoutes);   // HTML routes

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port: http://localhost:${PORT}`);
});
