const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/Database', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', () => console.log("Error in Connecting to Database"));
db.once('open', () => console.log("Connected to Database"));

// Serve static files directly from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to handle HTML files
app.get("*.html", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', req.path));
});

// Handle login POST request
app.post("/login", (req, res) => {
    // Your login logic here
    // For simplicity, let's assume the login is successful
    const userEmail = req.body.loginEmail;

    // Log information for debugging
    console.log(`User ${userEmail} logged in successfully`);

    // Redirect to dashboard after successful login
    res.redirect('/dashboard.html');
});

// Handle root GET request
app.get("/", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    });
    return res.redirect('form.html');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
