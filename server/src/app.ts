// WHAT TO DO IF YOU GET: Error: listen EADDRINUSE: address already in use :::3000

// IN TERMINAL
// run "netstat -aon | findstr :3000"
// run "taskkill /PID <PID_HERE> /F"

// OR
// go to task manager and see if there are duplicates for the "node.exe" program and end them.

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import requestLogger from "./logs/request-logger";

import resumesRoutes from "./routes/resumes";
import postsRoutes from "./routes/posts";
import userRoutes from "./routes/user";
import authRoutes from "./routes/auth";

import errorHandler from "./middleware/error";

import config from "./config";

import mongoose from "mongoose";

import http from "http";

import initLogs from "./utils/initLogs";

const app = express();

app.use(bodyParser.json());

app.use(requestLogger);

app.use(cors());

app.use("/resumes", resumesRoutes);
app.use("/posts", postsRoutes);
app.use("/user", userRoutes);
app.use("/auth", authRoutes);

app.use(errorHandler);

const server = http.createServer(app);

mongoose
  .connect(config.MONGO_URI)
  .then(async (result) => {
    await initLogs();

    if (require.main === module) {
      server.listen(config.PORT, () => {
        console.log(`Server running on port ${config.PORT}`);
      });
    }
  })
  .catch((err) => {
    console.log(err);
  });

// Handle termination signals
process.on("SIGINT", () => {
  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });

  mongoose.connection.close(false);
});

process.on("SIGTERM", () => {
  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });

  mongoose.connection.close(false);
});
