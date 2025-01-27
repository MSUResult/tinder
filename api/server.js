import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { createServer } from "http";
import multer from "multer"; // Add multer for handling file uploads

// routes
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import matchRoutes from "./routes/matchRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";

import { connectDB } from "./config/db.js";
import { initializeSocket } from "./socket/socket.server.js";

dotenv.config();

const app = express();
const httpServer = createServer(app);
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

// Set up multer storage and file size limits
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Temporary file storage folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Add unique timestamp to the file name
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB size limit for uploaded files (adjust as needed)
});

initializeSocket(httpServer);

app.use(express.json({ limit: "50mb" })); // Allow larger request payloads
app.use(express.urlencoded({ limit: "50mb", extended: true })); // Allow larger form data
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

// Define routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/matches", matchRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
  });
}

// Add a new route for image upload, using multer for handling files
app.post("/upload", upload.single("image"), (req, res) => {
  if (req.file) {
    res.json({ message: "File uploaded successfully", file: req.file });
  } else {
    res.status(400).json({ message: "No file uploaded" });
  }
});

httpServer.listen(PORT, () => {
  console.log("Server started at this port:" + PORT);
  connectDB();
});
