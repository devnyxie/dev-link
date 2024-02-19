import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import teamsRouter from "./routes/teams.router";
import usersRouter from "./routes/users.router";
import membersRouter from "./routes/members.router";
import requestsRouter from "./routes/requests.router";
import authRouter from "./routes/auth.router";
import cors from "cors";

// App Setup
const app: Express = express();

// Middleware
app.use(
  cors({
    origin: [
      process.env.CLIENT_URL_DEV || "",
      process.env.CLIENT_URL_PROD || "",
    ],
  })
);

app.use(bodyParser.json());

// Port
const port = process.env.PORT || 8080;

// App Start
app.listen(port, async () => {
  console.log(`[server]: Server is running at http://localhost:${port} ⚡`);
  // await handleGracefulShutdown(app, database);
});

// Routers
//   - Teams Router
app.use("/", teamsRouter);
//   - Users Router
app.use("/", usersRouter);
//   - Members Router
app.use("/", membersRouter);
//   - Requests Router
app.use("/", requestsRouter);
//   - Auth Router
app.use("/", authRouter);
