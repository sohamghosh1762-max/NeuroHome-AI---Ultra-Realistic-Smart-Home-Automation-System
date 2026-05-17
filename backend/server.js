const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");

dotenv.config();

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/authRoutes");
const deviceRoutes = require("./routes/deviceRoutes");

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/devices", deviceRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected");
})
.catch((err) => {
    console.log(err);
});

// Home Route
app.get("/", (req, res) => {
    res.send("NeuroHome AI Backend Running");
});

// Socket.IO
io.on("connection", (socket) => {

    console.log("User Connected");

    socket.on("deviceToggle", (data) => {
        io.emit("deviceUpdated", data);
    });

    socket.on("disconnect", () => {
        console.log("User Disconnected");
    });

});

// Server Port
const PORT = process.env.PORT || 8000;

// Start Server
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});